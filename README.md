<h2>Online-Tutor-API-v1||Register API</h2>
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
            userCategory: tutor
            schoolCategory: primary
        </pre>
</div>

<h1></h1>

<h2>Online-Tutor-API-v1||Login API</h2>
<p> The <strong>Login API</strong> enables a user to log into a profile in the database. Please, fill in the <strong>x-www-form-urlencoded</strong> in the <strong>body</strong> section.</p>

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
