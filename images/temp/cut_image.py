# import cv2
from PIL import Image
import os

for filename in os.listdir("rarities_original"):
	f = os.path.join("rarities_original", filename)

	img = Image.open(f)

	img = img.crop((30, 45, 330, 505))
	# img.show()

	img.save("rarities/{}".format(filename))


# img = Image.new('RGBA', (300, 460), (255, 255, 255, 0))
# img.save('empty.webp')