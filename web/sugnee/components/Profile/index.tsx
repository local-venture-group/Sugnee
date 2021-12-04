import { useState, useRef, useCallback, useContext } from "react";
import { useForm } from "react-hook-form";
import { Crop } from "react-image-crop";

// Contexts
import { AuthContext } from "../../contexts/Auth";

// Components
import CropModal from "../Modal/CropModal";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

// Types
import { User } from "../../interfaces/user";
interface UpdateProfileData {
  firstName: string;
  lastName: string;
  firstNameKana: string;
  lastNameKana: string;
  email: string;
}

const Profile: React.FC<{ user: User }> = ({ user }) => {
  const { updateProfile } = useContext(AuthContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UpdateProfileData>();

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
                className="bg-neutral-content text-neutral-content rounded-full w-32 h-32 hover:shadow"
              >
                <img
                  src={`http://${user.img_path}`}
                  style={{ borderRadius: "100%" }}
                />
              </label>
            ) : (
              <label
                htmlFor="cropModal"
                className="bg-gray-500 text-neutral-content rounded-full w-32 h-32 hover:bg-gray-300 hover:shadow"
              >
                <FontAwesomeIcon
                  icon={faUser}
                  size="2x"
                  className="ml-1 mt-12"
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
        <div className="w-full md:w-1/2 md:mx-auto my-6 py-1 bg-gray-500 text-center">
          <h1 className="text-white text-sm">基本情報</h1>
        </div>
        <form
          onSubmit={handleSubmit((data) =>
            updateProfile({ data, image: profileImage })
          )}
          className="w-full md:w-1/2 md:mx-auto"
        >
          <div className="w-full px-3 mb-3">
            <label
              className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="name"
            >
              氏名
            </label>
            <div className="flex">
              <div className="w-1/2">
                <input
                  id="lastName"
                  type="text"
                  defaultValue={user.last_name}
                  className="hover:bg-gray-100 focus:bg-gray-100 focus:outline-none rounded py-3 px-4 mb-3 w-full"
                  {...register("lastName", { required: true })}
                />
                {errors.lastName?.type === "required" && (
                  <p className="text-red-500 text-xs italic">姓は必須です</p>
                )}
                {errors.lastName?.type === "pattern" && (
                  <p className="text-red-500 text-xs italic">
                    数字は入力できません
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <input
                  id="firstName"
                  type="text"
                  defaultValue={user.first_name}
                  className="hover:bg-gray-100 focus:bg-gray-100 focus:outline-none rounded py-3 px-4 mb-3 w-full"
                  {...register("firstName", { required: true })}
                />
                {errors.firstName?.type === "required" && (
                  <p className="text-red-500 text-xs italic">名は必須です</p>
                )}
                {errors.firstName?.type === "pattern" && (
                  <p className="text-red-500 text-xs italic">
                    数字は入力できません
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="w-full px-3 mb-3">
            <label
              className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="nameKana"
            >
              氏名（フリガナ）
            </label>
            <div className="flex">
              <div className="w-1/2">
                <input
                  id="lastNameKana"
                  type="text"
                  defaultValue={user.last_name_kana}
                  className="hover:bg-gray-100 focus:bg-gray-100 focus:outline-none rounded py-3 px-4 mb-3 w-full"
                  {...register("lastNameKana", { required: true })}
                />
                {errors.lastNameKana?.type === "required" && (
                  <p className="text-red-500 text-xs italic">
                    姓（カナ）は必須です
                  </p>
                )}
                {errors.lastNameKana?.type === "pattern" && (
                  <p className="text-red-500 text-xs italic">
                    数字は入力できません
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <input
                  id="firstNameKana"
                  type="text"
                  defaultValue={user.first_name_kana}
                  className="hover:bg-gray-100 focus:bg-gray-100 focus:outline-none rounded py-3 px-4 mb-3 w-full"
                  {...register("firstNameKana", { required: true })}
                />
                {errors.firstNameKana?.type === "required" && (
                  <p className="text-red-500 text-xs italic">
                    名（カナ）は必須です
                  </p>
                )}
                {errors.firstNameKana?.type === "pattern" && (
                  <p className="text-red-500 text-xs italic">
                    数字は入力できません
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="w-full px-3 mb-3">
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
            {errors.email?.type === "required" && (
              <p className="text-red-500 text-xs italic">
                メールアドレスは必須です
              </p>
            )}
          </div>
          <div className="w-full px-3 mb-3">
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
          <div className="w-full px-3 mb-3">
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
          <button type="submit" className="w-full btn my-8">
            変更する
          </button>
        </form>
      </div>
    </>
  );
};

export default Profile;
