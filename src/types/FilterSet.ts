export type FilterSet = {
  handleSubmit: () => void;
  selects?: FilterSelect[];
  textInputs?: FilterTextInput[];
};

type FilterSelect = {
  name: string;
  placeholder: string;
  handler: (value: string) => void;
  options: string[];
  default?: string;
};

type FilterTextInput = {
  name: string;
  placeholder: string;
  handler: (value: string) => void;
};
