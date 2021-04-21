import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Navbar,
  NavbarText,
  Collapse,
  NavbarBrand,
} from "reactstrap";
import Modal from "./components/Modal/Modal";
import TodoForm from "./components/TodoForm/TodoForm";
import Tab from "./components/Tab/Tab";
import AddButton from "./components/AddButton/AddButton";
import SearchBar from "./components/SearchBar/SearchBar";
import TabContent from "./components/TabContent/TabContent";
import Select from "./select";
import {
  deleteTask,
  editTask,
  bulkDeleteTask,
} from "./components/actions/actions";
import Spinner from "./components/Spinner/Spinner";
import logo from "../src/assets/images/todo.png";

import "./App.css";
import { faAlignCenter } from "@fortawesome/free-solid-svg-icons";

const columnList = [
  { label: "Summary", value: "title" },
  { label: "Priority", value: "priority" },
  { label: "Created On", value: "createdAt" },
  { label: "Due Date", value: "dueDate" },
  { label: "Actions", value: "actions" },
];
const tabList = [
  { label: "All", value: "all" },
  { label: "Pending", value: "open" },
  { label: "Completed", value: "done" },
];

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentSortDirection, setCurrentSortDirection] = useState("ASC");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchString, setSearchString] = useState("");
  const [currentListView, setCurrentListView] = useState({});
  const [currentSort, setCurrentSort] = useState({
    label: "Summary",
    value: "title",
  });
  const [formMode, setFormMode] = useState("add");
  const [showDelete, setShowDelete] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [modalState, setModalState] = useState("");
  const [currentDropDownState, setCurrentDropDownState] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const todos = useSelector((state) => {
    return state.todos;
  });

  useEffect(() => {
    const statusFilterX = todos.filter((x) => {
      if (statusFilter === "all") {
        return x;
      } else {
        return x.currentState === statusFilter;
      }
    });
    const searchFilter = statusFilterX.filter((x) => {
      if (
        x.title.toLowerCase().indexOf(searchString.trim().toLowerCase()) !=
          -1 ||
        x.description
          .toLowerCase()
          .indexOf(searchString.trim().toLowerCase()) != -1
      ) {
        return x;
      }
    });

    const data =
      searchFilter.length > 0
        ? searchFilter.slice().sort((a1, b1) => {
            if (currentSort.value != "actions") {
              let comparison = 0;
              const a = a1[currentSort.value].toLowerCase();
              const b = b1[currentSort.value].toLowerCase();
              if (currentSortDirection === "ASC") {
                if (a > b) {
                  comparison = 1;
                } else if (a < b) {
                  comparison = -1;
                }
                return comparison;
              } else {
                if (a < b) {
                  comparison = 1;
                } else if (a > b) {
                  comparison = -1;
                }
                return comparison;
              }
            }
          })
        : [];
    setTodoList(data);
  }, [
    todos,
    statusFilter,
    searchString,
    currentDropDownState,
    currentSort,
    currentSortDirection,
  ]);

  const onSearch = (event) => {
    setSearchString(event.target.value);
  };

  const onClickonList = (data, status) => {
    if (status === "delete") {
      setShowDelete(true);
      setModalState(data);
    } else if (status === "status") {
      setLoading(true);
      dispatch(
        editTask({
          ...data,
          currentState: data.currentState === "open" ? "done" : "open",
        })
      ).then((x) => {
        setLoading(false);
      });
    } else {
      setShowModal(true);
      setCurrentListView(data);
      setFormMode(status);
    }
  };

  const onTabClick = (tab) => {
    setStatusFilter(tab.value);
  };
  const deleteRequest = (data) => {
    setLoading(true);
    dispatch(deleteTask(data.createdAt)).then(() => {
      setLoading(false);
      setShowDelete(false);
      setModalState("");
    });
  };

  const onBulkDelete = (data) => {
    setLoading(true);
    dispatch(bulkDeleteTask(data)).then(() => {
      setLoading(false);
    });
  };

  const onChangeDropDown = (event) => {
    setCurrentDropDownState(event.target.value);
  };
  return (
    <>
      <Navbar color="dark" expand="md">
        <img src={logo} width="60" height="60" />
        <Collapse navbar>
          <NavbarText
            style={{
              fontSize: "24px",
              color: "lightgreen",
            }}
          >
            Todo App
          </NavbarText>
        </Collapse>
      </Navbar>

      {loading ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: 500,
          }}
        >
          <Spinner />{" "}
        </div>
      ) : null}

      {showModal && (
        <Modal closeModal={() => setShowModal(false)}>
          <TodoForm
            formMode={formMode}
            data={currentListView}
            closeModal={() => setShowModal(false)}
          />
        </Modal>
      )}
      {showDelete && (
        <Modal closeModal={() => setShowModal(false)}>
          <form style={{ margin: "15px" }} noValidate>
            <h3>{modalState.title}</h3>
            <br />
            <p>Really You want to delete this Task?</p>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "12%",
              }}
            >
              <button
                onClick={() => deleteRequest(modalState)}
                //className="btn btn-danger"
              >
                Yes
              </button>
              &nbsp;&nbsp;
              <button
                onClick={() => {
                  setShowDelete(false);
                  setModalState("");
                }}
                //className="btn btn-success"
              >
                No
              </button>
            </div>
          </form>
        </Modal>
      )}
      <Container>
        <div
          style={{ position: "fixed", bottom: "8%", right: "4%", zIndex: 1 }}
        >
          <AddButton
            onClick={() => {
              setShowModal((status) => !status);
              setFormMode("add");
              setCurrentListView({
                title: "",
                description: "",
                priority: "",
                dueDate: "",
                createdAt: "",
                currentState: "",
              });
            }}
          />
        </div>

        <Row style={{ paddingTop: "30px" }}>
          <Col sm={2}>
            <h6 style={{ float: "right" }}>Group by:</h6>
          </Col>
          <Col sm={2}>
            <Select value={currentDropDownState} onChange={onChangeDropDown} />
          </Col>
          <Col sm={2}>
            <h6 style={{ float: "right" }}>Search :</h6>
          </Col>
          <Col sm={2}>
            <SearchBar value={setSearchString} search={onSearch} />
          </Col>
        </Row>

        <div>
          <Tab onClick={onTabClick} tabs={tabList} />
          <TabContent
            onGroupDelete={onBulkDelete}
            groupBy={currentDropDownState}
            onSort={(x) => {
              setCurrentSort(x);
              if (currentSortDirection === "ASC") {
                setCurrentSortDirection("DSC");
              } else {
                setCurrentSortDirection("ASC");
              }
            }}
            statusFilter={statusFilter}
            header={columnList}
            data={todoList}
            onClick={onClickonList}
          />
        </div>
      </Container>
    </>
  );
};

export default App;
