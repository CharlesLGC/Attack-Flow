const exampleTechniques = [
  {
    id: 1,
    nodeId: 'T1626',
    name: 'Abuse Elevation Control Mechanism',
    description:
      'Adversaries may circumvent mechanisms designed to control elevated privileges to gain higher-level permissions. Most modern systems contain native elevation control mechanisms that are intended to limit privileges that a user can gain on a machine. Authorization has to be granted to specific users in order to perform tasks that are designated as higher risk. An adversary can use several methods to take advantage of built-in control mechanisms in order to escalate privileges on a system.',
  },
  {
    id: 2,
    nodeId: 'T1626.001',
    name: 'Device Administrator Permissions',
    description:
      'Adversaries may abuse Android’s device administration API to obtain a higher degree of control over the device. By abusing the API, adversaries can perform several nefarious actions, such as resetting the device’s password for Endpoint Denial of Service, factory resetting the device for File Deletion and to delete any traces of the malware, disabling all the device’s cameras, or to make it more difficult to uninstall the app.',
  },
  {
    id: 3,
    nodeId: 'T1517',
    name: 'Access Notifications',
    description:
      'Adversaries may collect data within notifications sent by the operating system or other applications. Notifications may contain sensitive data such as one-time authentication codes sent over SMS, email, or other mediums. In the case of Credential Access, adversaries may attempt to intercept one-time code sent to the device. Adversaries can also dismiss notifications to prevent the user from noticing that the notification has arrived and can trigger action buttons contained within notifications.',
  },
  {
    id: 4,
    nodeId: 'T1640',
    name: 'Account Access Removal',
    description:
      'Adversaries may interrupt availability of system and network resources by inhibiting access to accounts utilized by legitimate users. Accounts may be deleted, locked, or manipulated (ex: credentials changed) to remove access to accounts.',
  },
  {
    id: 5,
    nodeId: 'T1638',
    name: 'Adversary-in-the-Middle',
    description:
      'Adversaries may attempt to position themselves between two or more networked devices to support follow-on behaviors such as Transmitted Data Manipulation or Endpoint Denial of Service.',
  },
  {
    id: 6,
    nodeId: 'T1437',
    name: 'Application Layer Protocol',
    description:
      'Adversaries may communicate using application layer protocols to avoid detection/network filtering by blending in with existing traffic. Commands to the mobile device, and often the results of those commands, will be embedded within the protocol traffic between the mobile device and server.',
  },
  {
    id: 7,
    nodeId: 'T1437.001',
    name: 'Web Protocols',
    description:
      'Adversaries may communicate using application layer protocols associated with web protocols traffic to avoid detection/network filtering by blending in with existing traffic. Commands to remote mobile devices, and often the results of those commands, will be embedded within the protocol traffic between the mobile client and server.',
  },
  {
    id: 8,
    nodeId: 'T1532',
    name: 'Archive Collected Data',
    description:
      'Adversaries may compress and/or encrypt data that is collected prior to exfiltration. Compressing data can help to obfuscate its contents and minimize use of network resources. Encryption can be used to hide information that is being exfiltrated from detection or make exfiltration less conspicuous upon inspection by a defender.',
  },
  {
    id: 9,
    nodeId: 'T1429',
    name: 'Audio Capture',
    description:
      'Adversaries may capture audio to collect information by leveraging standard operating system APIs of a mobile device. Examples of audio information adversaries may target include user conversations, surroundings, phone calls, or other sensitive information.',
  },
  {
    id: 10,
    nodeId: 'T1398',
    name: 'Boot or Logon Initialization Scripts',
    description:
      'Adversaries may use scripts automatically executed at boot or logon initialization to establish persistence. Initialization scripts are part of the underlying operating system and are not accessible to the user unless the device has been rooted or jailbroken.',
  },
  {
    id: 11,
    nodeId: 'T1616',
    name: 'Call Control',
    description:
      'Adversaries may make, forward, or block phone calls without user authorization. This could be used for adversary goals such as audio surveillance, blocking or forwarding calls from the device owner, or C2 communication.',
  },
  {
    id: 12,
    nodeId: 'T1414',
    name: 'Clipboard Data',
    description:
      'Adversaries may abuse clipboard manager APIs to obtain sensitive information copied to the device clipboard. For example, passwords being copied and pasted from a password manager application could be captured by a malicious application installed on the device.',
  },
  {
    id: 13,
    nodeId: 'T1623',
    name: 'Command and Scripting Interpreter',
    description:
      'Adversaries may abuse command and script interpreters to execute commands, scripts, or binaries. These interfaces and languages provide ways of interacting with computer systems and are a common feature across many different platforms. Most systems come with some built-in command-line interface and scripting capabilities, for example, Android is a UNIX-like OS and includes a basic Unix Shell that can be accessed via the Android Debug Bridge (ADB) or Java’s Runtime package.',
  },
  {
    id: 14,
    nodeId: 'T1623.001',
    name: 'Unix Shell',
    description:
      'Adversaries may abuse Unix shell commands and scripts for execution. Unix shells are the underlying command prompts on Android and iOS devices. Unix shells can control every aspect of a system, with certain commands requiring elevated privileges that are only accessible if the device has been rooted or jailbroken.',
  },
];

export default exampleTechniques;
