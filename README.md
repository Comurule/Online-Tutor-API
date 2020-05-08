<h1>Online-Tutor-API-v1||Features</h1>

<a href="#1">Register API</a><br/>
<a href='#2'>Login API</a><br/>
<a href='#3'>Retrieve All Subjects API</a><br/>
<a href='#4'>Retrieve A Subject API</a><br/>
<a href='#5'>Retrieve All Categories API</a><br/>
<a href='#6'>Retrieve All Tutors API</a><br/>
<a href='#7'>Create A Subject API</a><br/>
<a href='#8'>Update A Subject API</a><br/>
<a href='#9'>Delete A Subject API</a><br/>
<a href='#10'>Create A Category API</a><br/>
<a href='#11'>Update A Category API</a><br/>
<a href='#12'>Delete A Category API</a><br/>
<a href='#13'>Book A Lesson API</a><br/>
<a href='#14'>Update A Lesson API</a><br/>
<a href='#15'>Delete A Lesson API</a><br/>
<a href='#16'>Retrieve A Lesson API</a><br/>
<a href='#17'>Retrieve All Lessons API</a><br/>
<a href='#18'>Update A Tutor API</a><br/>
<a href='#19'>Retrieve A Tutor API</a><br/>
<a href='#20'>Register A Subject API</a><br/>
<a href='#21'>Retrieve All Registered Subjects API</a><br/>
<a href='#22'>Retrieve All Tutors in a Subject API</a><br/>


<h2 id='1'>Online-Tutor-API-v1||Register API</h2>
<p> The <strong>Register API</strong> enables a user to create a profile in the database. Please, fill in the <strong>x-www-form-urlencoded</strong> in the <strong>body</strong> section.</p>

<code> POST   /v1/register</code>

<div><h3>Parameters</h3>
    <table>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>firstName</td>
            <td>string</td>
            <td>Required. The first name of the user.</td>
        </tr>
        <tr>
            <td>lastName</td>
            <td>string</td>
            <td>Required. The last name of the user.</td>
        </tr>
        <tr>
            <td>userName</td>
            <td>string</td>
            <td>Required. The preffered username of the user. This must be unique in the system.</td>
        </tr>
        <tr>
            <td>email</td>
            <td>string</td>
            <td>Required. The email address of the user.</td>
        </tr>
        <tr>
            <td>password</td>
            <td>string</td>
            <td>Required. Password to the user account.</td>
        </tr>
        <tr>
            <td>userCategory</td>
            <td>string</td>
            <td>Required. User must choose between <strong>tutor</strong> and <strong>student</strong> depending on the preffered access level.</td>
        </tr>
        <tr>
            <td>schoolCategory</td>
            <td>string</td>
            <td>Required. User must choose between <strong>primary</strong>, <strong>jss</strong> and <strong>sss</strong> depending on the preffered school level.</td>
        </tr>
    </table>
</div>
<div>
    <h3>Example</h3>
        <pre>
            firstName:IDM 
            lastName:Calculus
            userName:IDMCalculus
            email:idm@gmail.com
            password:hello
            userCategory:tutor
            schoolCategory:primary
        </pre>
</div>

<h1></h1>

<h2 id='2'>Online-Tutor-API-v1||Login API</h2>
<p> The <strong>Login API</strong> enables a registered user to log into a profile in the database. Please, fill in the <strong>x-www-form-urlencoded</strong> in the <strong>body</strong> section and copy the token given on response for further authorized activities.</p>

<h3>Authorized Users:</h3>
<p>All registered users</p>

<code> POST   /v1/login</code>

<div><h3>Parameters</h3>
    <table>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>userName</td>
            <td>string</td>
            <td>Required. The username of the user account to be open.</td>
        </tr>
        <tr>
            <td>password</td>
            <td>string</td>
            <td>Required. Password to the user account.</td>
        </tr>
    </table>
</div>
<div>
    <h3>Example</h3>
        <pre>
            userName:IDMCalculus
            password:hello
        </pre>
</div>

<h1></h1>

<h2 id='3'>Online-Tutor-API-v1||Retrieve all subjects API</h2>
<p> The <strong>Retrieve all subjects API</strong> enables a registered user to retrieve all subjects in the database. Please, fill in the <strong>x-www-form-urlencoded</strong> in the <strong>body</strong> section and also the token given on <strong>Login</strong> should be copied to the <strong>Bearer Token</strong> in the <strong>Authorization</strong> section.</p>

<h3>Authorized Users:</h3>
<p>All registered users</p>

<code> GET   /v1/subjects</code>

<div><h3>Parameters</h3>
    <table>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>sort</td>
            <td>String</td>
            <td>Optional. The user is to choose<br/> 
            {name:1} to retrieve all subjects sorted by name and in alphabetical ascending order.<br/>
            {name:-1} to retrieve all subjects sorted by name and in alphabetical descending order.<br/>
            {category:1} to retrieve all subjects sorted by category and in alphabetical ascending order.<br/>
            Leaving the field blank retrieves  all subjects.</td>
        </tr>
    </table>
</div>
<div>
    <h3>Example</h3>
        <pre>
            sort:name:1
        </pre>
</div>

<h1></h1>

<h2 id='4'>Online-Tutor-API-v1||Retrieve a subject API</h2>
<p> The <strong>Retrieve a subject in a category by Id API</strong> enables a registered user to retrieve a subject by Id in a category in the database. Please, fill in the <strong>x-www-form-urlencoded</strong> in the <strong>body</strong> section and also the token given on <strong>Login</strong> should be copied to the <strong>Bearer Token</strong> in the <strong>Authorization</strong> section.</p>

<h3>Authorized Users:</h3>
<p>All registered users</p>

<code> GET   /v1/:category/:subject_id</code>

<h1></h1>

<h2 id='5'>Online-Tutor-API-v1||Retrieve all categories API</h2>
<p> The <strong>Retrieve all categories API</strong> enables a registered user to retrieve all categories in the database. Please, fill in the <strong>x-www-form-urlencoded</strong> in the <strong>body</strong> section and also the token given on <strong>Login</strong> should be copied to the <strong>Bearer Token</strong> in the <strong>Authorization</strong> section.</p>

<h3>Authorized Users:</h3>
<p>All registered users</p>

<code> GET   /v1/category</code>

<h1></h1>

<h2 id='6'>Online-Tutor-API-v1||Retrieve all Tutors API</h2>
<p> The <strong>Retrieve all Tutors API</strong> enables a registered user to retrieve all Tutors in the database. Please, fill in the <strong>x-www-form-urlencoded</strong> in the <strong>body</strong> section and also the token given on <strong>Login</strong> should be copied to the <strong>Bearer Token</strong> in the <strong>Authorization</strong> section.</p>

<h3>Authorized Users:</h3>
<p>All Admins and students</p>

<code> GET   /v1/tutors</code>

<div><h3>Parameters</h3>
    <table>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>sort</td>
            <td>string</td>
            <td>Optional. The user is to choose to either {firstName:1} to sort the tutors list by first name, in alphabetical ascending order or leaving the field empty, to get the tutors list unsorted .</td>
        </tr>
    </table>
</div>
<div>
    <h3>Example</h3>
        <pre>
           sort:firstName:1
        </pre>
</div>

<h1></h1>

<h2 id='7'>Online-Tutor-API-v1||Create a Subject API</h2>
<p> The <strong>Create a Subject API</strong> enables a registered admin to create a subject in any created category in the database. Please, fill in the <strong>x-www-form-urlencoded</strong> in the <strong>body</strong> section and also the token given on <strong>Login</strong> should be copied to the <strong>Bearer Token</strong> in the <strong>Authorization</strong> section.</p>

<h3>Authorized Users:</h3>
<p>Only Admins</p>

<code> POST   /v1/subjects</code>

<div><h3>Parameters</h3>
    <table>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>name</td>
            <td>string</td>
            <td>Required. The name given to the subject.</td>
        </tr>
        <tr>
            <td>category</td>
            <td>string</td>
            <td>Required. The category the subject will fall under. This category must exist in the database.</td>
        </tr>
    </table>
</div>
<div>
    <h3>Example</h3>
        <pre>
           name:maths
           category:primary
        </pre>
</div>

<h1></h1>

<h2 id='8'>Online-Tutor-API-v1||Update a Subject API</h2>
<p> The <strong>Update a Subject API</strong> enables a registered user to update a subject by Id in the database. Please, fill in the <strong>x-www-form-urlencoded</strong> in the <strong>body</strong> section and also the token given on <strong>Login</strong> should be copied to the <strong>Bearer Token</strong> in the <strong>Authorization</strong> section.</p>

<h3>Authorized Users:</h3>
<p>Only Admins and Tutors</p>

<code> POST   /v1/subjects/:subject_id</code>

<div><h3>Parameters</h3>
    <table>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>name</td>
            <td>string</td>
            <td>Optional. The name given to the subject.</td>
        </tr>
        <tr>
            <td>category</td>
            <td>string</td>
            <td>Optional. The category the subject will fall under. This category must exist in the database.</td>
        </tr>
    </table>
</div>
<div>
    <h3>Example</h3>
        <pre>
           name:maths
           category:primary
        </pre>
</div>

<h1></h1>

<h2 id='9'>Online-Tutor-API-v1||Delete a Subject API</h2>
<p> The <strong>Delete a Subject API</strong> enables a registered user to delete a subject by Id in the database. Please, fill in the <strong>x-www-form-urlencoded</strong> in the <strong>body</strong> section and also the token given on <strong>Login</strong> should be copied to the <strong>Bearer Token</strong> in the <strong>Authorization</strong> section.</p>

<h3>Authorized Users:</h3>
<p>Only Admins and Tutors</p>

<code> DELETE   /v1/subjects/:subject_id</code>

<h1></h1>

<h2 id='10'>Online-Tutor-API-v1||Create a Category API</h2>
<p> The <strong>Create a Category API</strong> enables a registered admin to create a category in the database. Please, fill in the <strong>x-www-form-urlencoded</strong> in the <strong>body</strong> section and also the token given on <strong>Login</strong> should be copied to the <strong>Bearer Token</strong> in the <strong>Authorization</strong> section.</p>

<h3>Authorized Users:</h3>
<p>Only Admins</p>

<code> POST   /v1/category</code>

<div><h3>Parameters</h3>
    <table>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>name</td>
            <td>string</td>
            <td>Required. The name given to the subject.</td>
        </tr>
    </table>
</div>
<div>
    <h3>Example</h3>
        <pre>
           name:primary
        </pre>
</div>

<h1></h1>

<h2 id='11'>Online-Tutor-API-v1||Update a Category API</h2>
<p> The <strong>Update a Category API</strong> enables a registered admin to update a category by Id in the database. Please, fill in the <strong>x-www-form-urlencoded</strong> in the <strong>body</strong> section and also the token given on <strong>Login</strong> should be copied to the <strong>Bearer Token</strong> in the <strong>Authorization</strong> section.</p>

<h3>Authorized Users:</h3>
<p>Only Admins</p>

<code> POST   /v1/category/:category_id</code>

<div><h3>Parameters</h3>
    <table>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>name</td>
            <td>string</td>
            <td>Optional. The name given to the category.</td>
        </tr>
    </table>
</div>
<div>
    <h3>Example</h3>
        <pre>
           name:primary
        </pre>
</div>

<h1></h1>

<h2 id='12'>Online-Tutor-API-v1||Delete a Category API</h2>
<p> The <strong>Delete a Category API</strong> enables a registered admin to delete a category by Id in the database. Please, fill in the <strong>x-www-form-urlencoded</strong> in the <strong>body</strong> section and also the token given on <strong>Login</strong> should be copied to the <strong>Bearer Token</strong> in the <strong>Authorization</strong> section.</p>

<h3>Authorized Users:</h3>
<p>Only Admins</p>

<code> DELETE   /v1/category/:category_id</code>

<h1></h1>

<h2 id='13'>Online-Tutor-API-v1||Book a Lesson API</h2>
<p> The <strong>Book a Lesson API</strong> enables a registered admin or student to book a Lesson. Please, fill in the <strong>x-www-form-urlencoded</strong> in the <strong>body</strong> section and also the token given on <strong>Login</strong> should be copied to the <strong>Bearer Token</strong> in the <strong>Authorization</strong> section.</p>

<h3>Authorized Users:</h3>
<p>Only Admins and Students</p>

<code> POST   /v1/lessons</code>

<div><h3>Parameters</h3>
    <table>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>student</td>
            <td>string</td>
            <td>Required. The username of the student booking for the lesson. This must be a registered student in the database.</td>
        </tr>
        <tr>
            <td>subject</td>
            <td>string</td>
            <td>Required. The subject to be booked for. This must be a registered subject in the database</td>
        </tr>
        <tr>
            <td>category</td>
            <td>string</td>
            <td>Required. The name of the category the subject falls under.</td>
        </tr>
        <tr>
            <td>tutor</td>
            <td>string</td>
            <td>Required.  The username of the tutor preferred for the lesson. This must be a registered tutor in the database.</td>
        </tr>
    </table>
</div>
<div>
    <h3>Example</h3>
        <pre>
           student:comurule
           subject:maths
           category:primary
           tutor:IDMCalculus
        </pre>
</div>

<h1></h1>

<h2 id='14'>Online-Tutor-API-v1||Update a Lesson API</h2>
<p> The <strong>Update a Lesson API</strong> enables a registered admin to update a lesson by Id in the database. Please, fill in the <strong>x-www-form-urlencoded</strong> in the <strong>body</strong> section and also the token given on <strong>Login</strong> should be copied to the <strong>Bearer Token</strong> in the <strong>Authorization</strong> section.</p>

<h3>Authorized Users:</h3>
<p>Only Admins</p>

<code> POST   /v1/lessons/:lesson_id</code>

<div><h3>Parameters</h3>
    <table>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>student</td>
            <td>string</td>
            <td>Optional. The username of the student booking for the lesson. This must be a registered student in the database.</td>
        </tr>
        <tr>
            <td>subject</td>
            <td>string</td>
            <td>Optional. The subject to be booked for. This must be a registered subject in the database</td>
        </tr>
        <tr>
            <td>category</td>
            <td>string</td>
            <td>Optional. The name of the category the subject falls under.</td>
        </tr>
        <tr>
            <td>tutor</td>
            <td>string</td>
            <td>Optional.  The username of the tutor preferred for the lesson. This must be a registered tutor in the database.</td>
        </tr>
    </table>
</div>
<div>
    <h3>Example</h3>
        <pre>
           student:comurule
           subject:maths
           category:primary
           tutor:IDMCalculus
        </pre>
</div>

<h1></h1>

<h2 id='15'>Online-Tutor-API-v1||Delete a Lesson API</h2>
<p> The <strong>Delete a Lesson API</strong> enables a registered admin to delete a lesson by Id in the database. Please, fill in the <strong>x-www-form-urlencoded</strong> in the <strong>body</strong> section and also the token given on <strong>Login</strong> should be copied to the <strong>Bearer Token</strong> in the <strong>Authorization</strong> section.</p>

<h3>Authorized Users:</h3>
<p>Only Admins</p>

<code> DELETE   /v1/lessons/:lesson_id</code>

<h1></h1>

<h2 id='16'>Online-Tutor-API-v1||Retrieve a Lesson API</h2>
<p> The <strong>Retrieve a Lesson API</strong> enables a registered admin to retrieve a lesson by Id in the database. Please, fill in the <strong>x-www-form-urlencoded</strong> in the <strong>body</strong> section and also the token given on <strong>Login</strong> should be copied to the <strong>Bearer Token</strong> in the <strong>Authorization</strong> section.</p>

<h3>Authorized Users:</h3>
<p>All Admins</p>

<code> GET   /v1/lessons/:lesson_id</code>

<h1></h1>

<h2 id='17'>Online-Tutor-API-v1||Retrieve all Lessons API</h2>
<p> The <strong>Retrieve all Lessons API</strong> enables a registered admin to retrieve all lessons in the database. Please, fill in the <strong>x-www-form-urlencoded</strong> in the <strong>body</strong> section and also the token given on <strong>Login</strong> should be copied to the <strong>Bearer Token</strong> in the <strong>Authorization</strong> section.</p>

<h3>Authorized Users:</h3>
<p>All Admins</p>

<code> GET   /v1/lessons</code>

<h1></h1>

<h2 id='18'>Online-Tutor-API-v1||Update a Tutor API</h2>
<p> The <strong>Update a Tutor API</strong> enables a registered admin to deactivate a tutor by Id (changing the tutor to a student), and make a tutor an admin the database. Please, fill in the <strong>x-www-form-urlencoded</strong> in the <strong>body</strong> section and also the token given on <strong>Login</strong> should be copied to the <strong>Bearer Token</strong> in the <strong>Authorization</strong> section.</p>

<h3>Authorized Users:</h3>
<p>Only Admins</p>

<code> POST   /v1/tutors/:tutor_id</code>

<div><h3>Parameters</h3>
    <table>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>admin</td>
            <td>boolean</td>
            <td>Optional. true makes the tutor an admin.</td>
        </tr>
        <tr>
            <td>userCategory</td>
            <td>string</td>
            <td>Optional. 'student' makes the tutor a student.<br/>
            'tutor' makes the tutor still a tutor.</td>
        </tr>
    </table>
</div>
<div>
    <h3>Example</h3>
        <pre>
           admin:true
           userCategory:tutor
        </pre>
</div>

<h1></h1>

<h2 id='19'>Online-Tutor-API-v1||Retrieve a Tutor API</h2>
<p> The <strong>Retrieve a Tutor API</strong> enables a registered admin to retrieve a tutor by Id in the database. Please, fill in the <strong>x-www-form-urlencoded</strong> in the <strong>body</strong> section and also the token given on <strong>Login</strong> should be copied to the <strong>Bearer Token</strong> in the <strong>Authorization</strong> section.</p>

<h3>Authorized Users:</h3>
<p>All Admins</p>

<code> GET   /v1/tutors/:tutor_id</code>

<h1></h1>

<h2 id='20'>Online-Tutor-API-v1||Register a Subject API</h2>
<p> The <strong>Register a Subject API</strong> enables a registered tutor to register a subject in the tutor's category in the database. Please, fill in the <strong>x-www-form-urlencoded</strong> in the <strong>body</strong> section and also the token given on <strong>Login</strong> should be copied to the <strong>Bearer Token</strong> in the <strong>Authorization</strong> section.</p>

<h3>Authorized Users:</h3>
<p>Only Tutors</p>

<code> POST   /v1/subjects/register</code>

<div><h3>Parameters</h3>
    <table>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>name</td>
            <td>string</td>
            <td>Required. The name given to the subject.</td>
        </tr>
        <tr>
            <td>category</td>
            <td>string</td>
            <td>Required. The category the subject falls under. </td>
        </tr>
    </table>
</div>
<div>
    <h3>Example</h3>
        <pre>
           name:maths
           category:primary
        </pre>
</div>

<h1></h1>

<h2 id='21'>Online-Tutor-API-v1||Retrieve All Registered Subjects API</h2>
<p> The <strong>Retrieve All Registered Subjects API</strong> enables a registered tutor to retrieve all registered subjects in the database. Please, fill in the <strong>x-www-form-urlencoded</strong> in the <strong>body</strong> section and also the token given on <strong>Login</strong> should be copied to the <strong>Bearer Token</strong> in the <strong>Authorization</strong> section.</p>

<h3>Authorized Users:</h3>
<p>Only Tutors</p>

<code> POST   /v1/subjects/:tutor_id</code>

<h1></h1>

<h2 id='22'>Online-Tutor-API-v1||Retrieve All Tutors In A Subject API</h2>
<p> The <strong>Retrieve All Tutors In A Subject API</strong> enables a registered student to retrieve all tutors registered to a  subject in the database. Please, fill in the <strong>x-www-form-urlencoded</strong> in the <strong>body</strong> section and also the token given on <strong>Login</strong> should be copied to the <strong>Bearer Token</strong> in the <strong>Authorization</strong> section.</p>

<h3>Authorized Users:</h3>
<p>Only Students</p>

<code> POST   /v1/tutors/:subject_id</code>

<h1></h1>
