import Button from "./index";

export default {
  title: "Button",
  component: Button,
  argTypes: {
    primary: {
      description: "基本ボタンかどうか",
      control: {
        type: "boolean",
      },
    },
    backgroundColor: {
      description: "ボタン色",
      control: "color",
    },
    size: {
      description: "ボタンサイズ",
      options: ["small", "medium", "large", "full"],
      control: { type: "select" },
    },
    label: {
      description: "ボタン内テキスト",
      control: "text",
    },
    onClick: {
      description: "ボタンクリック時のイベント",
    },
  },
};

export const Primary = () => <Button primary={true} label={"text"} />;
export const Secondary = () => (
  <Button primary={false} label={"text"} backgroundColor={"#ffd65a"} />
);
