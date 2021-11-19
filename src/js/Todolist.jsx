import React, { useEffect, useState } from "react";

const Todolist = () => {
	let cont = 0;
	let item = {
		label: "",
		done: false
	};
	const [listTasks, setListTasks] = useState([]);
	const [task, setTask] = useState(item);

	let URL_BASE = "https://assets.breatheco.de/apis/fake/todos/user";

	const handleSavetask = event => {
		setTask({ ...task, [event.target.name]: event.target.value });
		console.log(task);
	};

	const getTasks = async URL_BASE => {
		try {
			let response = await fetch(`${URL_BASE}/arausy`);
			let data = await response.json();
			setListTasks(data);
			console.log(data);
		} catch (error) {
			console.log(error, "EXPLOTE D:");
		}
	};

	const putTasks = async event => {
		try {
			if (event.key === "Enter") {
				if (task != "") {
					let response = await fetch(`${URL_BASE}/arausy`, {
						method: "PUT",
						body: JSON.stringify([...listTasks, task]),
						headers: {
							"Content-Type": "application/json"
						}
					});
					if (response.ok) {
						getTasks(URL_BASE);
						setTask(item);
					}
				}
			}
		} catch (error) {
			console.log(error, "EXPLOTE D:");
		}
	};

	const handleSubmit = event => {
		event.preventDefault();
	};

	// const handlekeyPress = event => {
	// 	if (event.key === "Enter") {
	// 		if (task != "") {
	// 			setListTasks([...listTasks, event.target.value]);
	// 			setTask("");
	// 			putTasks();
	// 		}
	// 	}
	// };

	const deleteTasks = async id => {
		const newList = listTasks.filter((task, index) => index != id);
		try {
			let response = await fetch(`${URL_BASE}/arausy`, {
				method: "PUT",
				body: JSON.stringify(newList),
				headers: {
					"Content-Type": "application/json"
				}
			});
			if (response.ok) {
				await getTasks(URL_BASE);
			}
		} catch (error) {
			console.log(error, "EXPLOTE D:");
		}
	};

	useEffect(() => {
		getTasks(URL_BASE);
		console.log("Me ejecuto");
	}, []);

	return (
		<div className="container">
			<div className="row">
				<div className="col-12 text-center text-secondary ">
					<h1>Todo list</h1>
				</div>
			</div>

			<div className="row">
				<div className="col-12">
					<div className="input-group mb-3 ">
						<input
							type="text"
							className="form-control "
							placeholder="What needs to be done?"
							aria-label="Recipient's username"
							aria-describedby="basic-addon2"
							name="label"
							value={task.label}
							onChange={handleSavetask}
							onKeyPress={putTasks}
						/>
						<span className="input-group-text" id="basic-addon2">
							Text here..
						</span>
					</div>

					<ul className="list-group">
						{listTasks.map((task, index) => {
							cont++;
							return (
								<li
									className="list-group-item"
									onClick={() => deleteTasks(index)}
									key={index}>
									{task.label}
									<i className="fas fa-times my-icon"></i>
								</li>
							);
						})}
						{cont === 0 ? (
							<p>Usted no tiene tareas pendientes</p>
						) : (
							<p>Usted tiene {cont} tareas pendientes</p>
						)}
					</ul>

					{/* <div className="buttons">
						<button
							type="button"
							className="btn btn-dark"
							onClick={putTasks}>
							click me to submit the item
						</button>

						<button type="second-button" className="btn btn-dark">
							click me to delete
						</button>
					</div> */}
				</div>
			</div>
		</div>
	);
};

export default Todolist;
