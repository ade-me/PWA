import cv2
import dlib
import numpy as np
from rembg import remove
import onnxruntime
# Load pre-trained face detector from dlib
detector = dlib.get_frontal_face_detector()

# Load pre-trained facial landmark predictor
predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")

# Load the input image with the headless 3D body
body_image = cv2.imread("testhumanimage1.jfif")
# body_image=remove(body_image)
# Load the input image with the head
head_image = cv2.imread("kcimage.png")
head_image=remove(head_image)
# Convert the head image to grayscale
gray_head = cv2.cvtColor(head_image, cv2.COLOR_BGR2GRAY)

# Detect faces in the grayscale head image
faces = detector(gray_head)

# Check if a face is detected
if len(faces) > 0:
    face = faces[0]  # Assuming only one face is detected

    # Get the facial landmarks for the face region
    landmarks = predictor(gray_head, face)

    # Extract coordinates of the head region
    head_left = landmarks.part(0).x
    head_top = landmarks.part(19).y
    head_right = landmarks.part(16).x
    head_bottom = landmarks.part(8).y

    # Crop the head region from the head image
    cropped_head = head_image[head_top:head_bottom, head_left:head_right]

    # Resize the cropped head to match the height of the body's head region
    body_head_height, body_head_width, _ = body_image.shape
    resized_head = cv2.resize(cropped_head, (body_head_width, body_head_height))

    # Concatenate the resized head and body images vertically
    combined_image = np.concatenate((resized_head, body_image), axis=0)

    # Create a blue background image with higher width and height
    background_height = combined_image.shape[0] + 200  # Add 200 pixels of height for blue background
    background_width = combined_image.shape[1] + 200   # Add 200 pixels of width for blue background
    blue_background = np.full((background_height, background_width, 3), (255, 0, 0), dtype=np.uint8)  # Create blue background

    # Calculate the position to paste the concatenated images onto the blue background
    start_x = 100  # Offset for the left side of the blue background
    start_y = 100  # Offset for the top side of the blue background

    # Paste the concatenated images onto the blue background
    blue_background[start_y:start_y+combined_image.shape[0], start_x:start_x+combined_image.shape[1]] = combined_image

    # Display the result
    cv2.imshow("Final Image", blue_background)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

else:
    print("No face detected in the input head image.")
