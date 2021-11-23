import { useState } from "react";
import { useForm } from "react-hook-form";
import { Crop } from "react-image-crop";

// Components
import CropModal from "../Modal/CropModal";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Profile = ({ user, updateProfile }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  //画像アップロード
  const [image, setImage] = useState<string | null>(null);
  const [src, setSrc] = useState<string | null>(null);

  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    x: 25,
    y: 10,
    width: 80,
    height: 80,
    aspect: 4 / 4,
  });
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);

  // 画像読み込み
  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files !== null) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        typeof reader.result === "string" && setSrc(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoaded = (image) => {
    setImageRef(image);
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
      const base64Image = canvas.toDataURL("img/url");
      setImage(base64Image);
    }
  };

  const addProfileImage = async () => {
    await onCropComplete(crop);
    const ModalcheckBox = document.querySelector(
      "#cropModal"
    ) as HTMLInputElement;
    ModalcheckBox.checked = false;
  };

  return (
    <>
      <div className="w-3/4 bg-white mb-6">
        <div className="w-full flex px-10 py-6 md:mb-0">
          <div className="avatar placeholder">
            {/* ユーザー情報の画像表示ができるようになったら分岐修正 */}
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
            <CropModal
              src={src}
              crop={crop}
              onSelectFile={onSelectFile}
              onImageLoaded={onImageLoaded}
              onCropComplete={onCropComplete}
              onCropChange={onCropChange}
              addProfileImage={addProfileImage}
            />
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
        <form
          onSubmit={handleSubmit((data) => updateProfile(data, user, image))}
        >
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
};

export default Profile;
