import { useState } from "react";
import { useForm } from "react-hook-form";

import axios from "axios";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Profile({ user }) {
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const updateProfile = async (data) => {
    // 画像ファイルで送信する可能性をふまえ、FormDataで送ってます
    console.log(data, image);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("_method", "PUT");
    console.log(formData.get("image"));

    await axios
      .post(`http://localhost/api/user/${user.id}/edit`, formData, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
        console.log("[login]ログイン失敗");
      });
  };

  //画像アップロード
  const [image, setImage] = useState(null);
  const [src, setSrc] = useState(null);

  const [crop, setCrop] = useState({
    unit: "%",
    x: 25,
    y: 10,
    width: 80,
    aspect: 4 / 4,
  });
  const [imageRef, setImageRef] = useState(null);

  // 画像読み込み
  const onSelectFile = (e) => {
    e.preventDefault();
    if (e.target.files !== null) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setSrc(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoaded = (image) => {
    setImageRef(image);
    console.log("ロード", imageRef);
  };

  // 画像くり抜き
  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onCropComplete = (crop) => {
    if (imageRef && crop.width && crop.height) {
      const canvas = document.createElement("canvas");
      const pixelRatio = window.devicePixelRatio;
      const scaleX = imageRef.naturalWidth / imageRef.width;
      const scaleY = imageRef.naturalHeight / imageRef.height;
      const ctx = canvas.getContext("2d");

      canvas.width = crop.width * pixelRatio * scaleX;
      canvas.height = crop.height * pixelRatio * scaleY;

      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingQuality = "high";

      if (ctx !== null) {
        ctx.drawImage(
          imageRef,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );
      }
      // base64にしてstate保存(仮)
      const base64Image = canvas.toDataURL("img/url");
      setImage(base64Image);
    }
  };

  const addProfileImage = async () => {
    await onCropComplete(crop);
    document.querySelector("#cropModal").checked = false;
  };

  return (
    <>
      <div className="w-3/4 bg-white mb-6">
        <div className="w-full flex px-10 py-6 md:mb-0">
          <div className="avatar placeholder">
            {image ? (
              <label
                htmlFor="cropModal"
                className="text-neutral-content rounded-full w-32 h-32 border"
              >
                <img src={image} style={{ borderRadius: "100%" }} />
              </label>
            ) : (
              <label
                htmlFor="cropModal"
                className="bg-neutral-focus text-neutral-content rounded-full w-32 h-32 hover:bg-primary"
              >
                <FontAwesomeIcon
                  icon={faUser}
                  size="lg"
                  className="ml-14 mt-14"
                />
              </label>
            )}
            <input type="checkbox" id="cropModal" className="modal-toggle" />
            {/* <CropModal
              src={src}
              crop={crop}
              onSelectFile={onSelectFile}
              onImageLoaded={onImageLoaded}
              onCropComplete={onCropComplete}
              onCropChange={onCropChange}
              addProfileImage={addProfileImage}
            /> */}
          </div>
          <div className="pl-6">
            <p className="text-3xl mb-3　">{user.name}</p>
            <p className="text-lg text-gray-500">{user.birth}</p>
            <p className="text-lg text-gray-500">
              {user.gender === 1 ? "男性" : "女性"}
            </p>
          </div>
        </div>
      </div>
      <div className="w-3/4 bg-white px-10 py-6">
        <form onSubmit={handleSubmit(updateProfile)}>
          <div className="w-full md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="email"
            >
              氏名
            </label>
            <input
              id="lastName"
              type="text"
              defaultValue={user.last_name}
              className="hover:bg-gray-100 focus:bg-gray-100 focus:outline-none rounded py-3 px-4 mb-3 w-1/2"
              {...register("lastName", { required: true })}
            />
            <input
              id="firstName"
              type="text"
              defaultValue={user.first_name}
              className="hover:bg-gray-100 focus:bg-gray-100 focus:outline-none rounded py-3 px-4 mb-3 w-1/2"
              {...register("firstName", { required: true })}
            />
          </div>
          <div className="w-full md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="email"
            >
              メールアドレス
            </label>
            <input
              id="email"
              type="text"
              defaultValue={user.email}
              className="hover:bg-gray-100 focus:bg-gray-100 focus:outline-none rounded py-3 px-4 mb-3 w-full"
              {...register("email", { required: true })}
            />
          </div>

          <button type="submit" className="w-full btn">
            変更する
          </button>
        </form>
      </div>
    </>
  );
}
