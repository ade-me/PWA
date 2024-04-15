import torch
import torchvision.transforms as transforms
from PIL import Image

# Load the model
model = torch.load('\\C:\\Users\\HP PC\\UTNet\\model', map_location=torch.device('cpu'))
model.eval()

# Preprocess input image
def preprocess_image(image_path):
    image = Image.open(image_path)
    preprocess = transforms.Compose([
        transforms.Resize((320, 320)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])
    return preprocess(image).unsqueeze(0)

# Remove background
def remove_background(input_image_path, output_image_path):
    input_image = preprocess_image(input_image_path)
    with torch.no_grad():
        output = model(input_image)['out'][0]
    output = (output >= 0.5).float() * 255
    output_image = transforms.ToPILImage()(output.byte())
    output_image.save(output_image_path)

# Usage
remove_background("imageone.png", "output.png")
