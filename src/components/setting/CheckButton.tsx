import { Button } from "@radix-ui/themes";
import { toast } from "react-toastify";
import { Ollama } from "ollama/browser";
import { useState } from "react";

type CheckState = "success" | "error";

export default function CheckButton({ url }: { url: string }) {
  const [checking, setChecking] = useState(false);
  const [_status, setStatus] = useState<CheckState | null>(null);
  const handleCheck = async () => {
    setChecking(true);
    try {
      const instance = new Ollama({ host: url });
      await instance.list();
      setStatus("success");
      toast.success("Connection successful!");
    } catch (e: any) {
      toast.error(
        `Failed to connect to the server\n\nAre you sure there is an ollama server running at ${url}?\n\n` +
          e.message
      );
      console.error(e);
      setStatus("error");
    } finally {
      setChecking(false);
    }
  };
  return (
    <>
      <Button variant="outline" type="button" onClick={handleCheck}>
        {checking ? "Checking..." : "Check"}
      </Button>
    </>
  );
}
