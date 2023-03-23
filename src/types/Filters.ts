export type IFilters<T> = {
  handleSubmit: () => void;
  selects?: IFilterSelect[];
  textInputs?: IFilterTextInput[];
};

type IFilterSelect = {
  name: string;
  placeholder: string;
  handler: (value: string) => void;
  options: IFilterOption[];
};

type IFilterTextInput = {
  name: string;
  placeholder: string;
  handler: (value: string) => void;
};

type IFilterOption = {
  name: string;
  value: string | number;
  default?: boolean;
};
