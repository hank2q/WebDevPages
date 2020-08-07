import os

images = ['images/' + image for image in os.listdir('../images')]
images.sort()
names = [os.path.splitext(os.path.basename(name))[0] for name in images]
with open('files.js', 'w') as f:
    f.write(f'var files = {images}\n')
    f.write(f'var names = {names}')
