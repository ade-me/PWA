from rembg import remove
import easygui
from PIL import Image

input_path=easygui.fileopenbox(title='Select Image File')
output_path=easygui.filesavebox(title='File saved to ...')
input=Image.open(input_path)
output=remove(input)
output.save(output_path)