/**
 * @file protocol/zteradb-protocol.d.ts
 *
 * --------------------------------------------------------------------------
 * ZTeraDB Protocol Wire Module Definitions
 * --------------------------------------------------------------------------
 *
 * @description
 * Typings for the low-level binary stream framing and orchestration layer.
 * Manages length-prefixed protocol boundaries over TLS/TCP sockets and bridges 
 * connection handles to async iterator generators.
 *
 * @dependencies 
 * - `tls`: Node.js Transport Layer Security module.
 * - `net`: Node.js Transmission Control Protocol (TCP) module.
 *
 * @example
 * import ZTeraDBProtocol from './zteradb-protocol.js';
 * const connection = new ZTeraDBProtocol(host, port, config, clientAuth);
 * const authData = await connection.authenticate();
 * const stream = await connection.executeQuery('SELECT * FROM users');
 *
 * @class       ZTeraDBProtocol
 * @package     zteradb.protocol
 * @author      [ZTeraDB] <dev@zteradb.com>
 * @version     2.0
 * @license     [ZTeraDB]
 * @license     https://zteradb.com/licence (SPDX-License-Identifier: Proprietary)
 */

import * as tls from 'tls';
import * as net from 'net';
import ZTeraDBConnectionManager from "@zteradb/client/connection/zteradb-connection";

/**
 * Union map representing runtime state machine configurations.
 */
export type ConnectionState = 1 | 2 | 3 | 4 | 5;

/**
 * Interface detailing the runtime configuration parameters injected into the driver.
 */
export interface ZTeraDBConfig {
  use_tls: boolean;
  verify_tls_host: boolean;
  [key: string]: any;
}

/**
 * Interface representing the shape of the credential evaluation contract.
 */
export interface ZTeraDBClientAuth {
  databaseID: string;
  env: string;
  generateAuthRequest(): Record<string, any>;
  [key: string]: any;
}

/**
 * Extended runtime type decoration representing a Socket augmented with internal session states.
 */
export type ZTeraDBSocket = (net.Socket | tls.TLSSocket) & {
  auth?: any;
};

/**
 * ZTeraDBProtocol handles the TCP/TLS connection with the ZTeraDB service, managing message frames.
 */
declare class ZTeraDBProtocol {
  host: string;
  port: number;
  ZTeraDBConfig: ZTeraDBConfig;
  clientAuth: ZTeraDBClientAuth;
  socket: ZTeraDBSocket | null;
  isConnecting: boolean;
  protected defaultBuffer: Buffer;
  protected buffer: Buffer[];
  protected dataHandler: (() => void) | null;
  protected connectPromise: Promise<ZTeraDBSocket> | null;
  protected recvBuffer: Buffer;
  protected maxBufferSize: number;
  protected state: ConnectionState;

  /**
   * Creates an instance of ZTeraDBProtocol.
   */
  constructor(host: string, port: number, ZTeraDBConfig: ZTeraDBConfig, clientAuth: ZTeraDBClientAuth);

  /**
   * Manages buffer size boundaries by checking if allocations exceed maximum limits.
   */
  protected manageBufferSize(): void;

  /**
   * Retrieves an existing connection context if it is active, or establishes a new initialization pipe.
   */
  getConnection(): Promise<ZTeraDBSocket>;

  /**
   * Spawns a new raw socket channel or TLS layer target routing downstream.
   */
  connectToServer(): Promise<ZTeraDBSocket>;

  /**
   * Binds stream lifecycle event listeners onto an open socket.
   */
  protected attachListeners(socket: ZTeraDBSocket): void;

  /**
   * Unpacks data arriving from the wire, parsing prefix frames and feeding the processing queue.
   */
  protected handleIncomingData(data: Buffer): void;

  /**
   * Tear-down handler executing connection cleanup actions when remote socket channels drop.
   */
  protected handleConnectionEnd(): void;

  /**
   * Evaluates network connection exceptions and normalizes them to an application-level throw.
   */
  protected handleConnectionError(err: Error): Error;

  /**
   * Serializes a data payload frame out across an active network pipeline block.
   */
  send(connection: ZTeraDBSocket, data: Record<string, any>): Promise<boolean>;

  /**
   * Prepends big-endian UInt32 length tags onto stringified transport frames.
   */
  protected createMessageBuffer(data: Record<string, any>): Buffer;

  /**
   * Transmits a database statement query across the wire and hooks a consumer evaluation block.
   * @param query - The string query execution script.
   * @param connectionManager - Optional tracking pool engine handling instance state orchestration.
   */
  executeQuery(query: string, connectionManager?: ZTeraDBConnectionManager | null): Promise<AsyncGenerator<any, void, unknown>>;

  /**
   * Asynchronously streams parsed execution blocks back to consumer processing domains.
   */
  getData(connectionManager?: ZTeraDBConnectionManager | null): AsyncGenerator<any, void, unknown>;

  /**
   * Validates internal structure configurations and filters runtime status parameters.
   */
  protected handleResponse(parsedResponse: any): any;

  /**
   * Submits authentication keys and completes identity registration protocols.
   */
  authenticate(): Promise<any>;

  /**
   * Gracefully drains buffered write commands and terminates the underlying socket session safely.
   */
  close(): Promise<void>;
}

export default ZTeraDBProtocol;