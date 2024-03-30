import tkinter as tk
from tkinter import filedialog, messagebox
from PIL import Image, ImageTk
import pytesseract

# Function to upload an image file
def upload_image():
    file_path = filedialog.askopenfilename(filetypes=[("Image files", "*.png;*.jpg;*.jpeg")])
    if file_path:
        display_image(file_path)
        extract_text(file_path)

# Function to display the uploaded image
def display_image(file_path):
    img = Image.open(file_path)
    img = img.resize((300, 300))  # Resize image for display
    img_tk = ImageTk.PhotoImage(img)
    image_label.config(image=img_tk)
    image_label.image = img_tk

# Function to extract text from the image
def extract_text(file_path):
    try:
        text = pytesseract.image_to_string(Image.open(file_path))
        text_entry.delete(1.0, tk.END)
        text_entry.insert(tk.END, text)
    except Exception as e:
        messagebox.showerror("Error", f"Failed to extract text: {str(e)}")

# Main Tkinter window
root = tk.Tk()
root.title("Image Text Extractor")

# Upload button
upload_button = tk.Button(root, text="Upload Image", command=upload_image)
upload_button.pack(pady=10)

# Image display
image_label = tk.Label(root)
image_label.pack()

# Text display
text_entry = tk.Text(root, height=10, width=40)
text_entry.pack(pady=10)

# Start the Tkinter event loop
root.mainloop()
