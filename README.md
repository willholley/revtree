# revtree
A command line tool to visualise a CouchDB document revision tree

## Installation

npm install -g revtree

## Usage

curl 'http://path/to/my/document?open_revs=all&revs=true' | revtree

## Example output

    $ curl 'http://path/to/my/document?open_revs=all&revs=true' | revtree

	my/document
	├─ 1-0d7d0e78f5361799ccb6653d8def8f2c
	│  ├─ 2-be0bbb1f7780e45955fb082047fe18f6
	│  └─ 3-02ddeea6d1f73b62d81a9aa695a811e0 (deleted)
	├─ 1-c5f2a05671d07baef933a4d80cd072be
	│  ├─ 2-9679f8c2e5676f357e0af9286a18029a
	│  └─ 3-0408fff191d0013ff8fdc6f3fd70621e (deleted)
	├─ 1-64994353c5c097ac470f1636ee5dad84
	│  ├─ 2-bdede54486f28942259840d12cd83bf2
	│  ├─ 3-5bceec5b8c0311416bc34bc3bff5ae17
	│  ├─ 4-911392184e09f66bea2d4e188e7f6f89
	│  └─ 5-0a30c59e5eda36bc8162a86f60945916 (deleted)
	└─ 1-6fbbd7d6f4f128de07a1630b60db7d1e
	   ├─ 2-66efa2bc1351bde2e2e6bf00fa449144
	   ├─ 3-c84f17bdd35cecb1c9a2068d0c9b9e3f
	   ├─ 4-42fe3b365dc20eb95b85683834487103
	   ├─ 5-547982dc8e063480a74475b666311a05
	   ├─ 6-c5cd2043937ad03be90c7abcaca9a6c7
	   ├─ 7-4ade22489c4c25adca207436f636746e
	   ├─ 8-1f79744b354736f9abef26e7bc6723d4
	   ├─ 9-2e643678eb9e3261cc211daba892c5cb
	   ├─ 10-ddb34734fd51bcb2ff01505867da6f6b (active)

