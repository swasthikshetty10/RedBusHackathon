import { api } from "./api";

export const drawRect = (detections, ctx) => {
  // Loop through each prediction
  detections.forEach((prediction) => {
    // Extract boxes and classes
    const utility = api.useContext()
    const [x, y, width, height] = prediction["bbox"];
    const text = prediction["class"];

    // Set styling
    utility.client.stream.send.mutate({
      image: "",
      name: text,
    })
    const color = Math.floor(Math.random() * 16777215).toString(16);
    ctx.strokeStyle = "#" + color;
    ctx.font = "18px Arial";

    // Draw rectangles and text
    ctx.beginPath();
    ctx.fillStyle = "#" + color;
    ctx.fillText(text, x, y);
    ctx.rect(x, y, width, height);
    ctx.stroke();
  });
};
