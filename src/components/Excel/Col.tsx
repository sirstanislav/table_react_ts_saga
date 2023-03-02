import * as React from "react";
import { useAppDispatch } from "../../redux/hooks";
import { Form, Button } from "react-bootstrap";
import { IColsType } from "../../redux/slices/excelSlice";
import { excelSliceAction } from "../../redux/slices/excelSlice";

interface IColProps {
  col: IColsType;
}

const Col: React.FC<IColProps> = ({ col }) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <th className="position-relative">
        <Form.Control
          value={col.title}
          aria-label="First name"
          className="input__cell_light fw-bold"
          onChange={(e) => {
            dispatch(
              excelSliceAction.setColTitle({
                title: e.target.value,
                id: col.id,
              })
            );
          }}
        />
        <Button
          type="button"
          className="px-1 py-0 position-absolute bottom-50 start-100 translate-middle bi bi-plus-square"
          onClick={(e) => {
            dispatch(excelSliceAction.addCol({ id: col.id }));
          }}
        ></Button>
      </th>
    </>
  );
};

export default Col;
