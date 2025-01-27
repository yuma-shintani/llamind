import { Dialog, Text, TextField, Select } from "@radix-ui/themes";
import { hideOllamaManagement } from "../../redux/slice/uiSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useForm } from "@mantine/form";
import { getOllamaServerConfig } from "../../lib/settingApi";
import { useEffect, useState } from "react";
import { PullButton, DeleteButton } from "./OllamaButton";
import {
  modelSelectors,
  getAllModelsThunk,
} from "../../redux/slice/modelSlice";

type FormValues = {
  ollamaServerUrl: string;
  customOllamaServer: boolean;
};

export default function OllamaDialog() {
  const ollamaManaagementOpen = useAppSelector(
    (state) => state.ui.ollamaManagementOpen
  );
  const dispatch = useAppDispatch();
  const form = useForm<FormValues>();
  const [pullModel, setPullModel] = useState("");
  const [deleteModel, setDeleteModel] = useState("");
  const [models, setModels] = useState<any[]>([]);

  const getModels = useAppSelector((state) =>
    modelSelectors.selectAll(state.models)
  );

  // Reduxの状態が変わったらモデルを更新
  useEffect(() => {
    setModels(getModels);
  }, [getModels]);

  // モデルリストを更新する関数
  const refreshModels = async () => {
    await dispatch(getAllModelsThunk());
    setPullModel("");
    setDeleteModel("");
  };

  useEffect(() => {
    getOllamaServerConfig().then((config) => {
      form.setFieldValue("ollamaServerUrl", config.url);
      form.setFieldValue("customOllamaServer", config.custom);
    });
    if (ollamaManaagementOpen) {
      refreshModels();
    }
  }, [ollamaManaagementOpen]);

  const handleChange = (isOpen: boolean) => {
    if (!isOpen) {
      dispatch(hideOllamaManagement());
      form.reset();
    }
  };

  return (
    <>
      <Dialog.Root open={ollamaManaagementOpen} onOpenChange={handleChange}>
        <Dialog.Content maxWidth="500px">
          <Dialog.Title>Model Management</Dialog.Title>
          <Text as="p" size="4" mt="4">
            Model Install
          </Text>
          <div className="flex items-center mt-2">
            <TextField.Root
              className="flex-1 mr-2"
              value={pullModel}
              onChange={(e) => setPullModel(e.target.value)}
            ></TextField.Root>
            <PullButton
              url={form.values.ollamaServerUrl}
              model={pullModel}
              onComplete={refreshModels}
            />
          </div>
          <Text as="p" size="4" mt="4">
            Model Uninstall
          </Text>
          <div className="flex items-center mt-2">
            <div className="flex-1 mr-2">
              <Select.Root
                value={deleteModel}
                onValueChange={setDeleteModel}
                size="2"
              >
                <Select.Trigger
                  placeholder="Select a model"
                  variant="ghost"
                  color="gray"
                  className="font-medium text-[15px]"
                ></Select.Trigger>
                <Select.Content color="gray" position="popper">
                  {models.map((model: any) => (
                    <Select.Item key={model.name} value={model.name}>
                      {model.name}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </div>
            <DeleteButton
              url={form.values.ollamaServerUrl}
              model={deleteModel}
              onComplete={refreshModels}
            />
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}
