import streamlit as st
import py_avataaars as pa
from PIL import Image
import random

st.set_page_config(layout="wide")

# wide app
st.sidebar.markdown('## Create your avatar')

skin_color2 = [skin.name.replace('_', ' ') for skin in pa.SkinColor]

with st.sidebar:
    st.markdown("**General**")
    style = st.sidebar.selectbox("Avatar Style", ([style for style in pa.AvatarStyle]))
    if style == pa.AvatarStyle.TRANSPARENT:
        chosen_bg_color = 'BLACK'
    else:
        chosen_bg_color = st.sidebar.selectbox("Background Color", [bg.name.replace('_', ' ') for bg in pa.Color])

    st.markdown("**Facial**")
    skin_color = st.sidebar.selectbox("Skin Color", [skin.name.replace('_', ' ') for skin in pa.SkinColor])
    mouth_type = st.sidebar.selectbox("Mouth Type", ([hair.name.replace('_', ' ') for hair in pa.MouthType]))

    eye_type = st.sidebar.selectbox("Eye Type", ([hair.name.replace('_', ' ') for hair in pa.EyesType]))
    eyebrow_type = st.sidebar.selectbox("Eyebrow Type", ([hair.name.replace('_', ' ') for hair in pa.EyebrowType]))

    hair_color = st.sidebar.selectbox("Hair Color", [hair.name.replace('_', ' ') for hair in pa.HairColor])
    facial_type = st.sidebar.selectbox("Facial Hair Type", [hair.name.replace('_', ' ') for hair in pa.FacialHairType])
    facial_hair_color = st.sidebar.selectbox("Facial Hair Color",
                                             [hair.name.replace('_', ' ') for hair in pa.HairColor])
    top_type = st.sidebar.selectbox("Top Type", ([hair.name.replace('_', ' ') for hair in pa.TopType]))

    st.markdown("**Accessories**")
    hat_color = st.sidebar.selectbox("Hat Color", ([hair.name.replace('_', ' ') for hair in pa.Color]))

    accessories_type = st.sidebar.selectbox("Accessories Type",
                                            ([hair.name.replace('_', ' ') for hair in pa.AccessoriesType]))

    st.markdown("**Clothes**")

    clothe_type = st.sidebar.selectbox("Clothes Type",
                                       ['COLLAR SWEATER', 'GRAPHIC SHIRT', 'HOODIE', 'OVERALL', 'SHIRT CREW NECK',
                                        'SHIRT SCOOP NECK', 'SHIRT V NECK'])
    color_clothes = st.sidebar.selectbox("Clothes Color", ([hair.name.replace('_', ' ') for hair in pa.Color]))
    clothe_graphic_type = st.sidebar.selectbox("Clothes Graphic Type",
                                               ([hair.name.replace('_', ' ') for hair in pa.ClotheGraphicType]))

# choose skin color, replace space with _ to match class definition
chosen_skin_color = skin_color.replace(' ', '_')
chosen_hair_color = hair_color.replace(' ', '_')
chosen_bg_color = chosen_bg_color.replace(' ', '_')
facial_type_color = facial_type.replace(' ', '_')
clothe_type_color = clothe_type.replace(' ', '_')
color_clothes_type = color_clothes.replace(' ', '_')


def match_data():
    global show_skin_enum, show_hair_enum, show_bg_enum, facial_type_enum, clothe_type_enum, color_clothes_enum
    global facial_enum, top_type_enum, hat_col_enum, mouth_type_enum, eye_type_enum, eyebrow_type_enum, accessories_type_enum, clothe_graphic_type_enum
    for skin in pa.SkinColor:
        if skin.name == chosen_skin_color:
            show_skin_enum = skin

    for skin in pa.TopType:
        if skin.name == top_type.replace(' ', '_'):
            top_type_enum = skin

    for skin in pa.MouthType:
        if skin.name == mouth_type.replace(' ', '_'):
            mouth_type_enum = skin

    for hair in pa.HairColor:
        if hair.name == chosen_hair_color:
            show_hair_enum = hair

        if hair.name == facial_hair_color.replace(' ', '_'):
            facial_enum = hair
    for bg in pa.Color:
        if bg.name == chosen_bg_color:
            show_bg_enum = bg

        if bg.name == hat_color.replace(' ', '_'):
            hat_col_enum = bg

    for facial in pa.FacialHairType:
        if facial.name == facial_type_color:
            facial_type_enum = facial

    for clothes in pa.ClotheType:
        if clothes.name == clothe_type_color:
            clothe_type_enum = clothes

    for clothes in pa.Color:
        if clothes.name == color_clothes_type:
            color_clothes_enum = clothes

    for clothes in pa.EyesType:
        if clothes.name == eye_type.replace(' ', '_'):
            eye_type_enum = clothes

    for clothes in pa.EyebrowType:
        if clothes.name == eyebrow_type.replace(' ', '_'):
            eyebrow_type_enum = clothes


    for clothes in pa.AccessoriesType:
        if clothes.name == accessories_type.replace(' ', '_'):
            accessories_type_enum = clothes

    for clothes in pa.ClotheGraphicType:
        if clothes.name == clothe_graphic_type.replace(' ', '_'):
            clothe_graphic_type_enum = clothes


    return show_skin_enum, show_hair_enum, show_bg_enum, facial_type_enum, clothe_type_enum, color_clothes_enum, facial_enum, top_type_enum, hat_col_enum, mouth_type_enum, eye_type_enum, eyebrow_type_enum, accessories_type_enum, clothe_graphic_type_enum


show_skin_enum, show_hair_enum, background_color_enum, facial_type_enum, clothe_type_enum, color_clothes_enum, facial_enum, top_type_enum, hat_col_enum, mouth_type_enum, eye_type_enum, eyebrow_type_enum, accessories_type_enum, clothe_graphic_type_enum = match_data()

if st.button("Random Avatar"):
    avatar = pa.PyAvataaar(
        style=random.choice(list(pa.AvatarStyle)),
        skin_color=random.choice(list(pa.SkinColor)),
        hair_color=random.choice(list(pa.HairColor)),
        background_color=random.choice(list(pa.Color)),
        facial_hair_type=random.choice(list(pa.FacialHairType)),
        facial_hair_color=random.choice(list(pa.Color)),
        top_type=random.choice(list(pa.TopType)),
        hat_color=random.choice(list(pa.Color)),
        mouth_type=random.choice(list(pa.MouthType)),
        eye_type=random.choice(list(pa.EyesType)),
        eyebrow_type=random.choice(list(pa.EyebrowType)),
        accessories_type=random.choice(list(pa.AccessoriesType)),
        clothe_graphic_type=random.choice(list(pa.ClotheGraphicType)),
        clothe_type=random.choice(list(pa.ClotheType)),
        clothe_color=random.choice(list(pa.Color))
    )

else:
    avatar = pa.PyAvataaar(
        style=style,
        skin_color=show_skin_enum,
        hair_color=show_hair_enum,
        background_color=background_color_enum,
        facial_hair_type=facial_type_enum,
        facial_hair_color=facial_enum,
        top_type=top_type_enum,
        hat_color=hat_col_enum,
        mouth_type=mouth_type_enum,
        eye_type=eye_type_enum,
        eyebrow_type=eyebrow_type_enum,
        accessories_type=accessories_type_enum,
        clothe_graphic_type=clothe_graphic_type_enum,
        clothe_type=clothe_type_enum,
        clothe_color=color_clothes_enum
    )

    avatar.render_png_file('avatar.png')
image = Image.open('avatar.png')

st.image(image)

st.download_button(label='Download Avatar',
                   data=open('avatar.png', 'rb').read(),
                   file_name='avatar.png',
                   mime='image/png')