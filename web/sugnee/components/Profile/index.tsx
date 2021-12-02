import { useState, useRef, useCallback } from "react";
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
  const [profileImage, setProfileImage] = useState<string | null>();
  const [src, setSrc] = useState<string | null>(null);

  const [crop, setCrop] = useState<Crop>({
    unit: "px",
    aspect: 1,
    x: 0,
    y: 0,
    width: 200,
    height: 200,
  });
  const imageRef = useRef<HTMLImageElement | null>(null);

  // 画像読み込み
  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        typeof reader.result === "string" && setSrc(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoaded = useCallback((image) => {
    imageRef.current = image;
  }, []);

  const onCropComplete = (crop) => {
    if (imageRef && crop.width && crop.height) {
      const image = imageRef.current;
      const canvas = document.createElement("canvas");
      const pixelRatio = window.devicePixelRatio;
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      const ctx = canvas.getContext("2d");

      canvas.width = crop.width * pixelRatio * scaleX;
      canvas.height = crop.height * pixelRatio * scaleY;

      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingQuality = "high";

      if (ctx !== null) {
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width * scaleX,
          crop.height * scaleY
        );
      }

      const base64Image = canvas.toDataURL("img/url");
      setProfileImage(base64Image);
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
      <div className="w-full md:w-3/4 bg-white px-10 py-6 rounded">
        <div className="text-center">
          <div className="avatar placeholder my-6">
            {profileImage ? (
              <label
                htmlFor="cropModal"
                className="text-neutral-content rounded-full w-32 h-32 border hover:shadow"
              >
                <img src={profileImage} style={{ borderRadius: "100%" }} />
              </label>
            ) : user?.img_path ? (
              <label
                htmlFor="cropModal"
                className="bg-neutral-content text-neutral-content rounded-full w-32 h-32 hover:bg-primary hover:shadow"
              >
                <img
                  src={`http://${user.img_path}`}
                  style={{ borderRadius: "100%" }}
                />
              </label>
            ) : (
              <label
                htmlFor="cropModal"
                className="bg-neutral-focus text-neutral-content rounded-full w-32 h-32 hover:bg-primary hover:shadow"
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
              onCropChange={(c) => setCrop(c)}
              addProfileImage={addProfileImage}
            />
          </div>
        </div>

        <form
          onSubmit={handleSubmit((data) =>
            updateProfile({ data, image: profileImage })
          )}
          className="w-full md:w-8/12 md:mx-auto"
        >
          <div className="w-full md:mb-0">
            <label
              className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="name"
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
              className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="nameKana"
            >
              氏名（フリガナ）
            </label>
            <input
              id="lastNameKana"
              type="text"
              defaultValue={user.last_name_kana}
              className="hover:bg-gray-100 focus:bg-gray-100 focus:outline-none rounded py-3 px-4 mb-3 w-1/2"
              {...register("lastNameKana", { required: true })}
            />
            <input
              id="firstNameKana"
              type="text"
              defaultValue={user.first_name_kana}
              className="hover:bg-gray-100 focus:bg-gray-100 focus:outline-none rounded py-3 px-4 mb-3 w-1/2"
              {...register("firstNameKana", { required: true })}
            />
          </div>
          <div className="w-full md:mb-0">
            <label
              className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
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
          <div className="w-full md:mb-0">
            <label
              className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="birth"
            >
              生年月日
            </label>
            <input
              disabled
              id="birth"
              type="text"
              defaultValue={user.birth}
              className="bg-white rounded py-3 px-4 mb-3 w-full"
            />
          </div>
          <div className="w-full md:mb-0">
            <label
              className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="gender"
            >
              性別
            </label>
            <input
              disabled
              id="gender"
              type="text"
              defaultValue={user.gender === 1 ? "男性" : "女性"}
              className="bg-white rounded py-3 px-4 mb-3 w-full"
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
