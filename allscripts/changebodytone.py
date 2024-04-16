import cv2

def change_body_tone(image_path, new_tone):
    # Load the image
    image = cv2.imread(image_path)

    # Convert to HSV color space
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

    # Define the range for black tone in HSV
    lower_black = (0, 0, 0)
    upper_black = (180, 255, 30)  # Adjust the threshold according to your needs

    # Mask black tone
    mask = cv2.inRange(hsv, lower_black, upper_black)

    # Change tone
    tone_adjusted = cv2.add(hsv, new_tone)

    # Apply mask
    adjusted_image = cv2.bitwise_and(tone_adjusted, tone_adjusted, mask=mask)

    # Convert back to BGR color space
    adjusted_image = cv2.cvtColor(adjusted_image, cv2.COLOR_HSV2BGR)

    return adjusted_image

# Example usage
image_path = 'kcimage.png'
new_tone = (255, 255, 0)  # Adjust the tone values as needed
adjusted_image = change_body_tone(image_path, new_tone)

# Display the result
cv2.imshow('Adjusted Image', adjusted_image)
cv2.waitKey(0)
cv2.destroyAllWindows()
