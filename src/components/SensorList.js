import { AiOutlineCamera } from "react-icons/ai";

import data from "../static/branches.json";
import "./SensorList.css";

function SensorList({ sensorSelect }) {
  let n = ["home", "dashboard", "orders"];

  return (
    <>
      <div style={{ }}>  {/*height: "40vh"*/}
        <main className="d-flex flex-nowrap">
          <div className="flex-shrink-0 p-2 w-100 h-100 bg-white">
            <a
              href="/"
              className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom"
            >
              <span className="fs-6 fw-semibold">Visual AI System</span>
            </a>
            {/* maxHeight: "75%" */}
            <ul
              className="list-unstyled ps-0"
              style={{ overflowY: "scroll", }}
            >
              {data.map((item, index) => {
                let branch = item.branches;
                let nn = n[index] + "-collapse";
                let xx = "#" + nn;
                return (
                  <li className="mb-1">
                    <button
                      onClick={() => sensorSelect(item)}
                      className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target={xx}
                      aria-expanded="true"
                    >
                      City: {item.city}
                    </button>
                    <div className="collapse show" id={nn}>
                      <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                        {branch.map((i2, ind2) => {
                          return (
                            <li onClick={() => sensorSelect(i2)}>
                              <a className="link-dark d-inline-flex text-decoration-none rounded">
                                <AiOutlineCamera />
                                &nbsp;&nbsp;{i2.name}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </main>
      </div>
    </>
  );
}

export default SensorList;
