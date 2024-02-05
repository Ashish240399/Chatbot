"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Rating } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

interface Column {
  id: "id" | "title" | "feedback" | "rating";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "id", label: "Conversation Id", minWidth: 60 },
  { id: "title", label: "Title", minWidth: 100 },
  { id: "feedback", label: "Feedback", minWidth: 170 },
  {
    id: "rating",
    label: "Rating",
    minWidth: 100,
    align: "right",
  },
];

interface Data {
  id: number;
  title: string;
  feedback: string;
  rating: any;
}

function createData(
  id: number,
  title: string,
  feedback: string,
  rating: any
): Data {
  return { id, title, feedback, rating };
}

export default function FeedbackTable({
  conversation,
}: {
  conversation: Conversation[];
}) {
  const [convArr, setConvArr] = React.useState<Conversation[]>([]);
  const ratingValues = [
    {
      title: "All",
      value: "All",
    },
    {
      title: "1",
      value: 1,
    },
    {
      title: "2",
      value: 2,
    },
    {
      title: "3",
      value: 3,
    },
    {
      title: "4",
      value: 4,
    },
    {
      title: "5",
      value: 5,
    },
  ];
  React.useEffect(() => {
    setConvArr(conversation);
  }, [conversation.length]);
  let rows: any = [];
  for (let i = 0; i < convArr.length; i++) {
    let row = createData(
      convArr[i].chatId,
      convArr[i].chats[0].text,
      convArr[i].feedback,
      <Rating name="read-only" value={convArr[i].rating} readOnly />
    );
    rows.push(row);
  }
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filteredRating, setFilteredRating] = React.useState<string | number>(
    "All"
  );
  const [openRatingDropdown, setOpenRatingDropdown] = React.useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    if (filteredRating == "All") {
      setConvArr(conversation);
    } else {
      setConvArr(conversation.filter((el) => el.rating === filteredRating));
    }
  }, [filteredRating]);
  return (
    <Paper sx={{ width: "100%" }}>
      <div className="flex items-start gap-2 justify-end px-[30px] text-[14px] pt-2">
        <div>Ratings:</div>
        <div
          className="relative hover:cursor-pointer"
          onClick={() => {
            setOpenRatingDropdown(!openRatingDropdown);
          }}
        >
          {filteredRating}
          {openRatingDropdown ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          {openRatingDropdown && (
            <div className="absolute top-[100%] left-[-20%] border bg-white z-50 w-[60px] text-[12px]">
              {ratingValues.map((value, index) => (
                <div
                  className="px-2 py-1 hover:bg-blue-100 hover:cursor-pointer"
                  onClick={() => {
                    setFilteredRating(value.value);
                    setOpenRatingDropdown(false);
                  }}
                  key={index}
                >
                  {value.title}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.feedback}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
