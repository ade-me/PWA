import cv2
import dlib
import threading
import requests
# Function to download the ONNX model
import sys
from backgroundremover.cmd.cli import main as background_remover
import sys
import cv2
import numpy as np

# Load pre-trained face detector from dlib
detector = dlib.get_frontal_face_detector()

# Load pre-trained facial landmark predictor
predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")

# Load the input image
image = cv2.imread("kcimage.png")
# image=remove(image)
# Convert the image to grayscale

gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Detect faces in the grayscale image
faces = detector(gray)

# Loop through each face and crop the head region
for face in faces:
    # Get the facial landmarks for the face region
    landmarks = predictor(gray, face)

    # Extract coordinates of the head region
    head_left = landmarks.part(0).x
    head_top = landmarks.part(19).y
    head_right = landmarks.part(16).x
    head_bottom = landmarks.part(8).y

    # Crop the head region from the image
    cropped_head = image[head_top:head_bottom, head_left:head_right]
    input_image = cropped_head
    output_image = "output.png"

    # Convert arguments to list format
    sys.argv = ["backgroundremover", "-i", input_image, "-o", output_image]
    # Display the cropped head
    cv2.imshow("Cropped Head", cropped_head)
    cv2.waitKey(0)

# Close all OpenCV windows
cv2.destroyAllWindows()
