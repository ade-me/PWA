import cv2
import numpy as np

def remove_background(image_path):
    # Load the image
    image = cv2.imread(image_path)
    
    # Convert the image to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Apply a threshold to segment the foreground (object) from the background
    _, binary = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY)
    
    # Invert the binary image so that the object becomes white and the background becomes black
    binary = cv2.bitwise_not(binary)
    
    # Apply a morphological operation (opening) to remove noise
    kernel = np.ones((5,5),np.uint8)
    binary = cv2.morphologyEx(binary, cv2.MORPH_OPEN, kernel)
    
    # Create a mask that includes only the object (white) and excludes the background (black)
    mask = cv2.merge((binary,binary,binary))
    
    # Use bitwise_and to apply the mask to the original image
    result = cv2.bitwise_and(image, mask)
    
    return result

# Path to the image
image_path = "mainimagetwo.jfif"

# Remove the background from the image
result = remove_background(image_path)

# Display the original and result images
cv2.imshow("Original Image", cv2.imread(image_path))
cv2.imshow("Background Removed", result)
cv2.waitKey(0)
cv2.destroyAllWindows()
