import requests

# URL of the ONNX model
url = 'https://github.com/danielgatis/rembg/releases/download/v0.0.0/u2net.onnx'

# Set the timeout for the request (e.g., 10 seconds)
timeout_seconds = 60

# Send a GET request to download the file
response = requests.get(url, timeout=timeout_seconds)

# Check if the request was successful
if response.status_code == 200:
    # Save the downloaded file
    with open('u2net.onnx', 'wb') as f:
        f.write(response.content)
    print("Download completed successfully.")
else:
    print(f"Failed to download the file. Status code: {response.status_code}")
