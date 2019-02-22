# bedrock-web-account
User account APIs for Bedrock Web Apps

# API Reference
## Classes

<dl>
<dt><a href="#AccountService">AccountService</a></dt>
<dd><p>This service is used to encapsulate all account
based activity for a project.</p>
</dd>
<dt><a href="#RegisterController">RegisterController</a></dt>
<dd><p>Encapsulates the registration methods.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#StatusType">StatusType</a> : <code>&quot;active&quot;</code> | <code>&quot;disabled&quot;</code> | <code>&quot;deleted&quot;</code></dt>
<dd></dd>
</dl>

<a name="AccountService"></a>

## AccountService
This service is used to encapsulate all account
based activity for a project.

**Kind**: global class  

* [AccountService](#AccountService)
    * [new exports.AccountService([config])](#new_AccountService_new)
    * [.exists(options)](#AccountService+exists) ⇒ <code>Boolean</code>
    * [.create(options)](#AccountService+create) ⇒ <code>Object</code>
    * [.get(options)](#AccountService+get) ⇒ <code>Object</code>
    * [.getAll(options)](#AccountService+getAll) ⇒ <code>Array</code>
    * [.update(options)](#AccountService+update) ⇒ <code>Void</code>
    * [.setStatus(options)](#AccountService+setStatus) ⇒ <code>Void</code>
    * [.getRoles(options)](#AccountService+getRoles) ⇒ <code>Array.&lt;Object&gt;</code>

<a name="new_AccountService_new"></a>

### new exports.AccountService([config])

| Param | Type | Default |
| --- | --- | --- |
| [config] | <code>Object</code> | <code>{urls: {base: &#x27;/accounts&#x27;}}</code> | 
| [config.urls] | <code>Object</code> | <code>{}</code> | 
| [config.urls.base] | <code>string</code> | <code>&quot;/accounts&quot;</code> | 

<a name="AccountService+exists"></a>

### accountService.exists(options) ⇒ <code>Boolean</code>
On 200 exists returns true
on error if it is a NotFoundError we return false
in all other cases we forward the error to the project.

**Kind**: instance method of [<code>AccountService</code>](#AccountService)  
**Returns**: <code>Boolean</code> - exists  

| Param | Type | Default |
| --- | --- | --- |
| options | <code>Object</code> |  | 
| [options.baseUrl] | <code>string</code> | <code>&quot;/accounts&quot;</code> | 
| options.email | <code>string</code> |  | 

<a name="AccountService+create"></a>

### accountService.create(options) ⇒ <code>Object</code>
Takes a url and an email then creates an account for a user.

**Kind**: instance method of [<code>AccountService</code>](#AccountService)  

| Param | Type | Default |
| --- | --- | --- |
| options | <code>Object</code> |  | 
| [options.url] | <code>string</code> | <code>&quot;/accounts&quot;</code> | 
| options.email | <code>string</code> |  | 

<a name="AccountService+get"></a>

### accountService.get(options) ⇒ <code>Object</code>
Takes a url and an id and finds a single account.

**Kind**: instance method of [<code>AccountService</code>](#AccountService)  
**Returns**: <code>Object</code> - an account  

| Param | Type | Default |
| --- | --- | --- |
| options | <code>Object</code> |  | 
| [options.baseUrl] | <code>string</code> | <code>&quot;/accounts&quot;</code> | 
| options.id | <code>string</code> |  | 

<a name="AccountService+getAll"></a>

### accountService.getAll(options) ⇒ <code>Array</code>
Returns all accounts that match the given query parameters.

**Kind**: instance method of [<code>AccountService</code>](#AccountService)  
**Returns**: <code>Array</code> - data  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  |  |
| [options.baseUrl] | <code>string</code> | <code>&quot;/accounts&quot;</code> | The base baseUrl. |
| options.email | <code>string</code> |  | The user's email. |
| [options.after] | <code>string</code> | <code>null</code> | An account's ID. |
| [options.limit] | <code>number</code> | <code>10</code> | How many accounts to return. |

<a name="AccountService+update"></a>

### accountService.update(options) ⇒ <code>Void</code>
Updates an account via a series of json patches
patches need to be in the:

[json patch format](https://tools.ietf.org/html/rfc6902)
[we use fast-json](https://www.npmjs.com/package/fast-json-patch)
for handling json patches.

**Kind**: instance method of [<code>AccountService</code>](#AccountService)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  |  |
| [options.baseUrl] | <code>string</code> | <code>&quot;/accounts&quot;</code> |  |
| options.id | <code>string</code> |  | An account's id. |
| options.sequence | <code>number</code> |  | An account's sequence number. |
| config.patch | <code>Array.&lt;Object&gt;</code> |  | A JSON patch per RFC6902. |

<a name="AccountService+setStatus"></a>

### accountService.setStatus(options) ⇒ <code>Void</code>
Takes an id and a status string then changes an account's status.

**Kind**: instance method of [<code>AccountService</code>](#AccountService)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  |  |
| [options.baseUrl] | <code>string</code> | <code>&quot;/accounts&quot;</code> |  |
| options.id | <code>string</code> |  | An account id. |
| options.status | [<code>StatusType</code>](#StatusType) |  | one of 3 status types |

<a name="AccountService+getRoles"></a>

### accountService.getRoles(options) ⇒ <code>Array.&lt;Object&gt;</code>
Takes an account's id and returns all sysRoles for it.

**Kind**: instance method of [<code>AccountService</code>](#AccountService)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  |  |
| [options.baseUrl] | <code>string</code> | <code>&quot;/accounts&quot;</code> |  |
| options.id | <code>string</code> |  | An account id. |

<a name="RegisterController"></a>

## RegisterController
Encapsulates the registration methods.

**Kind**: global class  

* [RegisterController](#RegisterController)
    * [new exports.RegisterController(options)](#new_RegisterController_new)
    * [.exists()](#RegisterController+exists)
    * [.register()](#RegisterController+register)

<a name="new_RegisterController_new"></a>

### new exports.RegisterController(options)

| Param | Type | Default |
| --- | --- | --- |
| options | <code>Object</code> |  | 
| [options.debounceExists] | <code>number</code> | <code>500</code> | 
| [options.accountServiceConfig] | <code>Object</code> | <code>{}</code> | 

<a name="RegisterController+exists"></a>

### registerController.exists()
Exists is a debounced method used to check if an email already exists
during registration.

**Kind**: instance method of [<code>RegisterController</code>](#RegisterController)  
<a name="RegisterController+register"></a>

### registerController.register()
Registers a user then sets registering to false.

**Kind**: instance method of [<code>RegisterController</code>](#RegisterController)  
<a name="StatusType"></a>

## StatusType : <code>&quot;active&quot;</code> \| <code>&quot;disabled&quot;</code> \| <code>&quot;deleted&quot;</code>
**Kind**: global typedef  


---
Copyright (c) 2018-2019 Digital Bazaar, Inc. All rights reserved.

