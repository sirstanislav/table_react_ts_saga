import { Cell } from "./Cell";
import uuid from "react-uuid";
import * as React from "react";
import { Button, Form } from "react-bootstrap";
import { IRowsType } from "../../redux/slices/excelSlice";
import { excelSliceAction } from "../../redux/slices/excelSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

interface IRowProps {
  row: IRowsType;
  index: number;
}

const Row: React.FunctionComponent<IRowProps> = ({ row, index }) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <tr>
        <td className="position-relative">
          {index + 1}
          <Button
            type="button"
            className="px-1 py-0 position-absolute end-100 bi bi-plus-square button__cell"
            onClick={(e) => {
              dispatch(excelSliceAction.addRow({ id: row.id }));
            }}
          ></Button>
        </td>
        {row.cells.map((cell) => (
          <Cell key={cell.id} cell={cell} />
        ))}
      </tr>
    </>
  );
};

export default Row;
