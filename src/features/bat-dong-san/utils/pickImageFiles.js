const PICKER_OPTIONS = {
  multiple: true,
  excludeAcceptAllOption: true,
  types: [
    {
      description: 'Ảnh JPG, PNG',
      accept: { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] },
    },
  ],
};

export function canUseImagePicker() {
  return typeof window !== 'undefined' && typeof window.showOpenFilePicker === 'function';
}

export async function pickImageFiles() {
  const handles = await window.showOpenFilePicker(PICKER_OPTIONS);
  return Promise.all(handles.map((handle) => handle.getFile()));
}
