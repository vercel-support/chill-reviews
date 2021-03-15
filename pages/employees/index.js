import React from 'react';

import { Modal, EmployeesTable, Header } from "@/components";
import { setModalOpen } from "@/store";


function Employees() {
	return (
		<React.Fragment>
			<Header title="employees" action={setModalOpen} />
			<EmployeesTable />
			<Modal />
		</React.Fragment>
	);
}

export default Employees;
