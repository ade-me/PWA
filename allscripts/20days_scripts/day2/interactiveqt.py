from PyQt6.QtWidgets import QApplication,QWidget,QLabel
from PyQt6.QtGui import QPixmap
import sys
import os


class MainWindow(QWidget):
    def __init__(self):
        super().__init__()
        self.setFixedSize(1200,500)

        self.image_label=QLabel(self)
        self.image_label.setFixedSize(600,300)
        # from py_avataaars import PyAvataaar

        # avatar = PyAvataaar()
        import py_avataaars as pa
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
        # self.image_label.setStyleSheet("background-color:blue;")
        self.image_label.setPixmap(QPixmap("kc.png"))
        self.image_label.move(40,50)

        self.show()
app=QApplication(sys.argv)
window=MainWindow()
sys.exit(app.exec())
