CREATE TABLE run(
	run_id SERIAL PRIMARY KEY,
	public_id VARCHAR(32) UNIQUE NOT NULL,
	name VARCHAR(50) NOT NULL,
	why_blood VARCHAR(1024) NOT NULL,
	why_knife VARCHAR(1024) NOT NULL,
	what_you_done VARCHAR(1024) NOT NULL,
	had_kill BOOLEAN DEFAULT NULL,
	judge_id INT REFERENCES run(run_id) DEFAULT 1
);