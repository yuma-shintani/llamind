import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import ReduxProvider from "./redux/ReduxProvider";
import IpcReceiver from "./IpcReceiver";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

function App() {
  // 外部リンク処理
  useEffect(() => {
    // クリックイベントリスナーを設定
    const handleLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLAnchorElement;

      // <a> タグでかつ href 属性が存在する場合
      if (
        target.tagName === "A" &&
        target.href &&
        target.href.startsWith("https://")
      ) {
        event.preventDefault(); // デフォルトのリンク動作を無効化
        window.ipcRenderer.invoke("open-external-link", target.href); // 外部ブラウザでリンクを開く
      }
    };

    // イベントリスナーを追加
    document.addEventListener("click", handleLinkClick);

    // クリーンアップ: コンポーネントがアンマウントされた際にリスナーを削除
    return () => {
      document.removeEventListener("click", handleLinkClick);
    };
  }, []);

  return (
    <ReduxProvider>
      <RouterProvider router={router} />
      <IpcReceiver />
      <ToastContainer position="bottom-right" />
    </ReduxProvider>
  );
}

export default App;
