import os
import sys
sys.path.append("pifuhd")

import torch
import numpy as np
from skimage.io import imread, imsave
from skimage.transform import resize
from pifuhd.net import PIFuHDWrapper


# Set device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load PIFuHD model
pifuhd = PIFuHDWrapper(device=device)

# Load input image
input_image_path = "allscripts/kcimage.jpg"
input_image = imread(input_image_path)
input_image = resize(input_image, (512, 512))  # Resize to model input size if necessary

# Generate the avatar
avatar = pifuhd.render(input_image)

# Save the generated avatar
output_path = "generated_avatar.png"
imsave(output_path, avatar)
print(f"Avatar saved at {output_path}")
