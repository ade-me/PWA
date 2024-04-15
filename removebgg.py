from backgroundremover import BackgroundRemover

# Initialize the BackgroundRemover object
remover = BackgroundRemover()

# Specify the path to the input image
input_path = "kcimage."

# Remove the background and save the output image
output_path = "output_image.png"
remover.remove_background(input_path, output_path)
