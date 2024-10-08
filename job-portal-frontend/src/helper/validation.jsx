import Icon from "/src/icons/Icon";

export const validation = (data, type) => {
    const errors = {};

    if(type === "signup") {
        if(!data.first_name.trim()) {
            errors.first_name = <span>
                <Icon icon="alert-circle" />
                <div>You must enter your first name.</div>
            </span>;
        } else {
            delete errors.first_name;
        };

        if(!data.last_name.trim()) {
            errors.last_name = <span>
                <Icon icon="alert-circle" />
                <div>You must enter your last name.</div>
            </span>;
        } else {
            delete errors.last_name;
        };

        if(!data.username) {
            errors.username = <span>
                <Icon icon="alert-circle" />
                <div>You must enter a username.</div>
            </span>;
        } else {
            delete errors.username;
        };

        if(!data.email) {
            errors.email = <span>
                <Icon icon="alert-circle" />
                <div>You must enter a valid email belonging to you.</div>
            </span>;
        } else {
            delete errors.email;
        };

        if(!data.password) {
            errors.password = <span>
                <Icon icon="alert-circle" />
                <div>You must enter a password.</div>
            </span>;
        } else if(data.password.length < 8) {
            errors.password = <span>
                <Icon icon="alert-circle" />
                <div>You must enter a password with at least 8 characters.</div>
            </span>;
        } else {
            delete errors.password;
        };

        if(!data.birth_date) {
            errors.birth_date = <span>
                <Icon icon="alert-circle" />
                <div>You must enter your birth date.</div>
            </span>;
        } else {
            delete errors.birth_date;
        };
    } else if(type === "login") {
        if(!data.username) {
            errors.username = <span>
                <Icon icon="alert-circle" />
                <div>You must enter your username.</div>
            </span>;
        } else {
            delete errors.username;
        };

        if(!data.password) {
            errors.password = <span>
                <Icon icon="alert-circle" />
                <div>You must enter your password.</div>
            </span>;
        } else {
            delete errors.password;
        };
    } else if(type === "jobs") {
        if(!data.title.trim()) {
            errors.title = <span>
                <Icon icon="alert-circle" />
                <div>You must enter a title.</div>
            </span>;
        } else {
            delete errors.title;
        };

        if(!data.sector) {
            errors.sector = <span>
                <Icon icon="alert-circle" />
                <div>You must enter the sector.</div>
            </span>;
        } else {
            delete errors.sector;
        };

        if(!data.salary) {
            errors.salary = <span>
                <Icon icon="alert-circle" />
                <div>You must enter the salary.</div>
            </span>;
        } else {
            delete errors.sector;
        };

        if(!data.location.trim()) {
            errors.location = <span>
                <Icon icon="alert-circle" />
                <div>You must enter the location.</div>
            </span>;
        } else {
            delete errors.location;
        };

        if(!data.job_type) {
            errors.job_type = <span>
                <Icon icon="alert-circle" />
                <div>You must enter the job type.</div>
            </span>;
        } else  {
            delete errors.job_type;
        };
    }

    return errors;
}