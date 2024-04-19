from rest_framework import viewsets
from django.http import HttpResponseRedirect
from django.conf import settings
from rest_framework.response import Response
from core_app_root.avatar_creation.serializers.create_avatar import CreateAvatar
import cv2
import dlib
import numpy as np
import os
from rembg import remove
class CreateAvatar(viewsets.ModelViewSet):
    http_method_names = ['post']
    serializer_class = CreateAvatar

    def get_queryset(self):
        return super().get_queryset()

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            # Load pre-trained face detector from dlib
            detector = dlib.get_frontal_face_detector()
            # Load pre-trained facial landmark predictor
            predictor = dlib.shape_predictor("shape_predictor_81_face_landmarks.dat")

            # Read the uploaded image
            image_file = serializer.validated_data['file']
            nparr = np.fromstring(image_file.read(), np.uint8)
            head_image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

            # Load the body image and resize its width by three times
            body_image = cv2.imread("testhumanimage1.jfif")
            body_image = cv2.resize(body_image, (body_image.shape[1]*3, body_image.shape[0]))

            # Convert the head image to grayscale
            gray_head = cv2.cvtColor(head_image, cv2.COLOR_BGR2GRAY)

            # Detect faces in the grayscale head image
            faces = detector(gray_head)

            # Check if a face is detected
            if len(faces) > 0:
                face = faces[0]  # Assuming only one face is detected
                # Get the facial landmarks for the face region
                landmarks = predictor(gray_head, face)

                head_top = landmarks.part(19).y
                head_right = landmarks.part(16).x
                head_right = landmarks.part(16).x
                head_bottom = landmarks.part(8).y
                # Extract coordinates of the head region
                # Extract coordinates of the head region
                head_left = landmarks.part(0).x
                head_bottom = landmarks.part(8).y

                # Adjust the head_top coordinate to create more space for the head top
                head_height = head_bottom - head_top
                extra_space_percentage = 0.1  # Adjust as needed
                extra_space = int(head_height * extra_space_percentage)
                head_top -= extra_space

                # Ensure head_top does not go below 0
                head_top = max(0, head_top)
                # head_left = landmarks.part(0).x
                # head_top = landmarks.part(19).y
                # head_right = landmarks.part(16).x
                # head_bottom = landmarks.part(8).y

                # Crop the head region from the head image
                cropped_head = head_image[head_top:head_bottom, head_left:head_right]

                # Calculate the percentage for padding
                padding_percentage = 0.1
                padding_height = int(cropped_head.shape[0] * padding_percentage)

                # Calculate the new head height with a 2 percent increase
                new_head_height = int(cropped_head.shape[0] * 1.02)

                # Calculate the new head width with a 2 percent increase
                new_head_width = int(cropped_head.shape[1] * 1.02)

                # Resize the cropped head to fit into the background with padding
                resized_head = cv2.resize(cropped_head, (new_head_width, new_head_height))

                # Create a white background with the same size as the body image
                white_background = np.full((body_image.shape[0], body_image.shape[1], 3), (255, 255, 255), dtype=np.uint8)

                # Calculate the coordinates to place the head image at the center of the white background with padding
                bg_center_x = white_background.shape[1] // 2
                head_center_x = resized_head.shape[1] // 2
                start_x = bg_center_x - head_center_x
                end_x = start_x + resized_head.shape[1]
                start_y = white_background.shape[0] - resized_head.shape[0]  # Placing at the bottom
                end_y = white_background.shape[0]  # Place at the bottom

                # Place the resized head onto the white background with padding
                white_background[start_y:end_y, start_x:end_x] = resized_head

                # Combine the resized head and body images vertically
                combined_image = np.concatenate((white_background, body_image), axis=0)

                # Save the result
                image_path = os.path.join(settings.MEDIA_ROOT, 'current.png')


                cv2.imwrite('current.png',combined_image)
                # Construct the URL of the saved image
                image_url = "https://replit.com/@Christiankel/PWA#current.png"

                return Response({"status": True, "image_url": image_url})
            else:
                return Response({"status": False, "message": "No face detected in the input head image."})
        else:
            return Response({"status": False, "message": "Invalid request."})

