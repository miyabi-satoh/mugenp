import os
import cv2
import glob

os.chdir(os.path.dirname(os.path.abspath(__file__)))

pic_data = sorted(glob.glob("./screenshots/*.png"))

if pic_data:
    size = (768, 685)
    fourcc = cv2.VideoWriter_fourcc('m', 'p', '4', 'v')
    save = cv2.VideoWriter(
        './screenshots/slideshow.mp4',
        fourcc,
        1.5,
        size)

    for i in range(len(pic_data)):
        img = pic_data[i]
        img = cv2.imread(img)  # 画像を読み込む
        img = cv2.resize(img, size)  # 上でサイズを指定していますが、念のため
        save.write(img)  # 保存

    print(f"{i}個の画像から動画を作成しました")

    save.release()  # ファイルを閉じる
