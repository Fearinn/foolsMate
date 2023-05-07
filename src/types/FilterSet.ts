export type IFilterSet = {
  handleSubmit: () => void;
  selects?: IFilterSelect[];
  textInputs?: IFilterTextInput[];
};

type IFilterSelect = {
  name: string;
  placeholder: string;
  handler: (value: string) => void;
  options: string[];
  default?: string;
};

type IFilterTextInput = {
  name: string;
  placeholder: string;
  handler: (value: string) => void;
};
