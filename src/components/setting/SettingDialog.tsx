import { Button, Dialog, Switch, Text, TextField } from "@radix-ui/themes";
import { hideSetting } from "../../redux/slice/uiSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useForm } from "@mantine/form";
import {
  OllamaServerConfig,
  getOllamaServerConfig,
  setOllamaServerConfig,
} from "../../lib/settingApi";
import { useEffect } from "react";
import CheckButton from "./CheckButton";

type FormValues = {
  ollamaServerUrl: string;
  customOllamaServer: boolean;
};

export default function SettingDialog() {
  const settingOpen = useAppSelector((state) => state.ui.settingOpen);
  const dispatch = useAppDispatch();
  const form = useForm<FormValues>();

  useEffect(() => {
    getOllamaServerConfig().then((config) => {
      form.setFieldValue("ollamaServerUrl", config.url);
      form.setFieldValue("customOllamaServer", config.custom);
    });
  }, [settingOpen]);

  const handleChange = (isOpen: boolean) => {
    if (!isOpen) {
      dispatch(hideSetting());
      form.reset();
    }
  };

  const handleSubmit = (values: FormValues) => {
    const config: OllamaServerConfig = {
      custom: values.customOllamaServer,
      url: values.ollamaServerUrl,
    };
    setOllamaServerConfig(config);
    dispatch(hideSetting());
  };

  const handleCheckChange = (value: boolean) => {
    form.setFieldValue("customOllamaServer", value);
  };

  return (
    <>
      <Dialog.Root open={settingOpen} onOpenChange={handleChange}>
        <Dialog.Content maxWidth="500px">
          <Dialog.Title>Setting</Dialog.Title>
          <Text as="p" size="4" mt="4">
            Ollama Host
          </Text>
          <div className="flex items-center gap-2 mt-2">
            <Switch
              checked={form.values.customOllamaServer}
              onCheckedChange={handleCheckChange}
            />
            <Text>Customize Ollama Server</Text>
          </div>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <div className="mt-2">
              <div className="flex items-center">
                <TextField.Root
                  className="flex-1 mr-2"
                  {...form.getInputProps("ollamaServerUrl")}
                  disabled={!form.values.customOllamaServer}
                />
                <CheckButton url={form.values.ollamaServerUrl} />
              </div>
            </div>
            <div className="flex items-center justify-end mt-8 w-full">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}
