import React, { useState } from "react";

const Todolist = () => {
	let cont = 0;
	const [tasks, setTasks] = useState([]);
	const [task, setTask] = useState("");

	const handleSavetask = event => {
		setTask(event.target.value);
		console.log(task);
	};

	const handleSubmit = event => {
		event.preventDefault();
	};

	const handlekeyPress = event => {
		if (event.key === "Enter") {
			if (task != "") {
				setTasks([...tasks, event.target.value]);
				setTask("");
			}
		}
	};

	const handleDelete = id => {
		const newList = tasks.filter((task, index) => index != id);
		setTasks(newList);
	};

	return (
		<div className="container border-bottom border-secondary border-3">
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
							onChange={handleSavetask}
							onKeyPress={handlekeyPress}
							value={task}
						/>
						<span className="input-group-text" id="basic-addon2">
							Text here..
						</span>
					</div>

					<ul className="list-group">
						{tasks.map((task, index) => {
							cont++;
							return (
								<li
									className="list-group-item"
									key={index}
									onClick={() => handleDelete(index)}>
									{task}
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
				</div>
			</div>
		</div>
	);
};

export default Todolist;
