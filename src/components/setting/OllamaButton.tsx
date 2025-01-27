import { Button } from "@radix-ui/themes";
import { toast } from "react-toastify";
import { Ollama } from "ollama/browser";
import { useState } from "react";

type PullState = "success" | "error";
type DeleteState = "success" | "error";

// PullButton
type PullButtonProps = {
  url: string;
  model: string;
  onComplete: () => void; // コールバック型を追加
};

// DeleteButton
type DeleteButtonProps = {
  url: string;
  model: string;
  onComplete: () => void; // コールバック型を追加
};

export function PullButton({ url, model, onComplete }: PullButtonProps) {
  const [pull, setPull] = useState(false);
  const [_status, setStatus] = useState<PullState | null>(null);
  const handlePull = async () => {
    setPull(true);
    try {
      const instance = new Ollama({ host: url });
      await instance.pull({ model: model });
      setStatus("success");
      toast.success("Model Install successful!");
    } catch (e: any) {
      toast.error(
        `Failed to connect to the server\n\nAre you sure there is an ollama server running at ${url}?\n\n` +
          e.message
      );
      console.error(e);
      setStatus("error");
    } finally {
      setPull(false);
      onComplete();
    }
  };
  return (
    <>
      <Button
        variant="outline"
        type="button"
        onClick={handlePull}
        disabled={pull}
      >
        {pull ? "Installing..." : "Install"}
      </Button>
    </>
  );
}

export function DeleteButton({ url, model, onComplete }: DeleteButtonProps) {
  const [deleteModel, setDeleteModel] = useState(false);
  const [_status, setStatus] = useState<DeleteState | null>(null);
  const handleDelete = async () => {
    setDeleteModel(true);
    try {
      const instance = new Ollama({ host: url });
      await instance.delete({ model: model });
      setStatus("success");
      toast.success("Model Uninstall successful!");
    } catch (e: any) {
      toast.error(`Failed Uninstall ${model}?\n\n` + e.message);
      console.error(e);
      setStatus("error");
    } finally {
      setDeleteModel(false);
      onComplete();
    }
  };
  return (
    <>
      <Button
        variant="outline"
        type="button"
        onClick={handleDelete}
        disabled={deleteModel}
        color="red"
      >
        {deleteModel ? "Uninstalling..." : "Uninstall"}
      </Button>
    </>
  );
}
