from PyQt6.QtWidgets import QApplication, QWidget, QLabel, QPushButton, QVBoxLayout
from PyQt6.QtGui import QPixmap, QImage
import sys
import cv2
import py_avataaars as pa


class MainWindow(QWidget):
    def __init__(self):
        super().__init__()
        self.setFixedSize(1200, 500)

        layout = QVBoxLayout(self)
        self.setLayout(layout)

        self.image_label = QLabel(self)
        self.image_label.setFixedSize(600, 300)
        layout.addWidget(self.image_label)

        self.blur_button = QPushButton("Apply Blur", self)
        layout.addWidget(self.blur_button)
        self.blur_button.clicked.connect(self.apply_blur)

        self.hue_button = QPushButton("Adjust Hue", self)
        layout.addWidget(self.hue_button)
        self.hue_button.clicked.connect(self.adjust_hue)

        # Render the avatar
        self.render_avatar()

    def render_avatar(self):
        avatar = pa.PyAvataaar(
            style=pa.AvatarStyle.CIRCLE,
            skin_color=pa.SkinColor.LIGHT,
            hair_color=pa.HairColor.BROWN,
            facial_hair_type=pa.FacialHairType.DEFAULT,
            facial_hair_color=pa.HairColor.BLACK,
            top_type=pa.TopType.SHORT_HAIR_SHORT_FLAT,
            hat_color=pa.Color.BLACK,
            mouth_type=pa.MouthType.SMILE,
            eye_type=pa.EyesType.DEFAULT,
            eyebrow_type=pa.EyebrowType.DEFAULT,
            nose_type=pa.NoseType.DEFAULT,
            accessories_type=pa.AccessoriesType.DEFAULT,
            clothe_type=pa.ClotheType.GRAPHIC_SHIRT,
            clothe_color=pa.Color.HEATHER,
            clothe_graphic_type=pa.ClotheGraphicType.BAT,
        )

        avatar.render_png_file('kc.png')
        pixmap = QPixmap("kc.png")
        self.image_label.setPixmap(pixmap)

    def apply_blur(self):
        # Read the current image
        image = cv2.imread("kc.png")

        # Apply blur to the image
        blurred_image = cv2.blur(image, (15, 15))

        # Save the modified image
        cv2.imwrite("kc_modified.png", blurred_image)

        # Update the displayed image
        pixmap = QPixmap("kc_modified.png")
        self.image_label.setPixmap(pixmap)

    def adjust_hue(self):
        # Read the current image
        image = cv2.imread("kc.png")

        # Convert the image to the HSV color space
        hsv_image = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

        # Adjust the hue channel (for example, increase by 30 degrees)
        hsv_image[:, :, 0] = (hsv_image[:, :, 0] + 30) % 180

        # Convert the image back to BGR color space
        modified_image = cv2.cvtColor(hsv_image, cv2.COLOR_HSV2BGR)

        # Save the modified image
        cv2.imwrite("kc_modified.png", modified_image)

        # Update the displayed image
        pixmap = QPixmap("kc_modified.png")
        self.image_label.setPixmap(pixmap)


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec())
