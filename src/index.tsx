
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider} from "@chakra-ui/react";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(container);

root.render(
  <ChakraProvider >
    <App />
  </ChakraProvider>
);
