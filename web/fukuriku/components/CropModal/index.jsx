import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import Button from "../Button";

export default function CropModal({
  src,
  crop,
  onSelectFile,
  onImageLoaded,
  onCropComplete,
  onCropChange,
  addProfileImage,
}) {
  return (
    <div className="modal" id="cropModal">
      <div className="modal-box bg-white max-w-4xl h-4/5">
        <div className="w-full flex flex-col justify-center items-center px-4">
          <div className="w-full">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => onSelectFile(e)}
            />
            {src && (
              <>
                <ReactCrop
                  src={src}
                  crop={crop}
                  ruleOfThirds
                  onImageLoaded={onImageLoaded}
                  onComplete={onCropComplete}
                  onChange={onCropChange}
                />
              </>
            )}

            <div className="justify-center w-full mt-2">
              <Button text={"決定"} option={"w-full"} event={addProfileImage} />
              <label
                htmlFor="cropModal"
                className="w-full btn btn-outline btn-primary mt-3"
              >
                とじる
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
