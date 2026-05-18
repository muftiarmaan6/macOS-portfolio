import { WindowControls } from "#components/imports";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";

const ImgFile = () => {
  const { windows } = useWindowStore();
  const windowData = windows.imgfile.data;

  if (!windowData) return null;

  return (
    <>
      <div id="window-header">
        <WindowControls target="imgfile" />
        <p className="flex-1 text-center truncate pr-16">{windowData.name}</p>
      </div>

      <div className="preview">
        <img
          src={windowData.imageUrl}
          alt={windowData.name}
          loading="lazy"
        />
      </div>
    </>
  );
};

const ImgFileWindow = WindowWrapper(ImgFile, "imgfile");
export default ImgFileWindow;
