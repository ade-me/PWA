from backgroundremover.cmd.cli import main as background_remover
import sys
import cv2
import numpy as np

# Define input and output file paths
input_image = "imageone.png"
output_image = "output.png"

# Convert arguments to list format
sys.argv = ["backgroundremover", "-i", input_image, "-o", output_image]

# Call the background remover function
background_remover()

print("Background removed and saved as", output_image)

# Load the output image
img = cv2.imread(output_image)
if img is None:
    print("Error: Unable to load output image.")
    sys.exit(1)

# Create a mask for the removed background
mask = np.all(img == [0, 0, 0], axis=-1)

# Replace the removed background with blue
img[mask] = [255, 0, 0]  # Blue color (BGR format)

# Save the image with the blue background
cv2.imwrite(output_image, img)

print("Background changed to blue and saved as", output_image)
