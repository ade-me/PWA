import bpy

# Clear default scene
bpy.ops.object.select_all(action='DESELECT')
bpy.ops.object.select_by_type(type='MESH')
bpy.ops.object.delete()

# Create a new cube
bpy.ops.mesh.primitive_cube_add(size=2)

# Move the cube to a specific location
bpy.context.object.location = (0, 0, 0)

# Add a camera
bpy.ops.object.camera_add(location=(5, -5, 5))
bpy.context.object.rotation_euler = (1, 0, 0)  # Rotate the camera

# Set up rendering settings
bpy.context.scene.render.engine = 'CYCLES'
bpy.context.scene.render.resolution_x = 1920
bpy.context.scene.render.resolution_y = 1080
bpy.context.scene.render.image_settings.file_format = 'PNG'

# Render the scene
bpy.ops.render.render(write_still=True)
