import * as React from "react";
import { Form } from "react-bootstrap";
import { debounce } from "lodash";
import { excelSliceAction } from "../../redux/slices/excelSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

interface ICellProps {
  cell: {
    id: string;
    title: string;
  };
}

const Cell: React.FunctionComponent<ICellProps> = ({ cell }) => {
  const dispatch = useAppDispatch();

  const onChange = debounce((e) => {
    const { value } = e.target;

    dispatch(
      excelSliceAction.setCellTitle({
        title: value,
        id: cell.id,
      })
    );
  }, 500);

  return (
    <>
      <td key={cell.id}>
        <Form.Control
          defaultValue={cell.title}
          as="textarea"
          className="input__cell_light-gray overflow-auto"
          onChange={onChange}
        />
      </td>
    </>
  );
};

export { Cell };
